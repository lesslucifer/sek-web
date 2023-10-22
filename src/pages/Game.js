import { PlayCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Launcher } from 'react-chat-window';
import { useNavigate, useParams } from "react-router-dom";
import useStateRef from 'react-usestateref';
import shortid from 'shortid';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import newHTTP from '../api/http';
import Audios from '../audios';
import GameControlButton from '../components/GameControlButton';
import MainGame from '../components/MainGame';
import usePortrait from '../hooks/usePortrait';
import { GetPlayerName, UpdatePlayerName } from '../models/game';
import { onAction } from '../recoil-models/actions';
import { gameState, onGame, setDeck, setGamePlayer } from '../recoil-models/game';
import { meState, onMe } from '../recoil-models/me';
import { onRoom, roomState } from '../recoil-models/room';
import { API_URL, SOCKET_PATH } from '../utils/env';
import Storage from '../utils/storage';
import { useRecoilStateRef } from '../utils/userecoilstateref';
import Utils from '../utils/utils';
import AdminSettings from './AdminSettings';
import './Game.css';
import Ledger from './Ledger';
import Logs from './Logs';
import PlayerManager from './PlayerManager';
import Preferences from './Preferences';

function Game() {
  const [, contextHolder] = notification.useNotification()
  const portrait = usePortrait()
  const navigate = useNavigate()
  const params = useParams()
  const http = newHTTP(params.gameid)
  const socket = useRef(null)

  const [room, setRoom, roomRef] = useRecoilStateRef(roomState)
  const [game, setGame, gameRef] = useRecoilStateRef(gameState)
  const [me, setMe, meRef] = useRecoilStateRef(meState)
  const [uid, setUid] = useState(null)
  const [scale, setScale] = useState(1)

  const [settings, setSettings] = useState({
    autoAction: '',
    hand: null,
    round: null
  })
  const [prefs, setPrefs, prefsRef] = useStateRef(Storage.getPreferences())
  const [isOnline, setIsOnline] = useState(false)
  const [showingModal, setShowingModal] = useState('')

  const [messages, setMessages, messagesRef] = useStateRef([])
  const [nNewMessage, setNNewMessage] = useStateRef(0)
  const [showChat, setShowChat, showChatRef] = useStateRef(false)

  const modalWidth = portrait ? '98%' : '80%'

  UpdatePlayerName(room)

  useEffect(Utils.noReturn(Utils.autoError(() => {
    http.verifyUser().then(uid => {
      setUid(uid)
    })
    notification.config({
      maxCount: 2
    })
    Audios.init()
  })), [])

  useEffect(Utils.noReturn(Utils.autoError(() => {
    if (!uid) return
    if (!room) reloadGame().catch(() => {
      Swal.fire('Error', 'Cannot load game. Game not found!', 'error').then(() => {
        navigate('/')
      })
    })
    return setupSocket()
  })), [uid])

  const trySetRoom = (newRoom) => {
    setRoom(newRoom)
  }

  const updateGamePlayer = (playerId, modifier) => {
    if (!game) return
    const index = game.players.findIndex(p => p.id === playerId)
    if (index < 0) return

    const players = Array.from(game.players)
    players[index] = modifier(players[index])
    setGame((prev) => (prev && {
      ...prev,
      players
    }))
  }

  const reloadGame = () => http.get('/room').then(resp => {
    const { room, game, me } = resp.data?.data ?? {}
    if (!room) throw new Error(`Cannot find game ${params.gameid}`)
    trySetRoom(room)
    if (game) setGame(game)
    if (me) setMe(me)
  })

  const setupSocket = () => {
    if (socket.current) return

    const conn = io(new URL(API_URL).origin, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10,
      autoConnect: false,
      path: SOCKET_PATH
    })

    socket.current = conn

    console.log(`Start connecting new socket`, API_URL, SOCKET_PATH)
    const onConnected = () => {
      console.log(`On socket`, conn.id, `connected`)
      conn.on('disconnect', () => {
        console.log(`On socket`, conn.id, `disconnected`)
        conn.off()
        conn.on('connect', onConnected)
        setIsOnline(false)
      })

    const ctx = {
      roomRef, setRoom,
      gameRef, setGame,
      meRef, setMe,
      setGamePlayer: setGamePlayer(setGame),
      setDeck: setDeck(setGame),
      uid
    }

    conn.on('room', onRoom(ctx))

    conn.on('game', onGame(ctx))

    conn.on('me', onMe(ctx))

    conn.on('act', onAction(ctx, (act) => performAction(act)))

      // conn.on('room', (data) => {
      //   try {
      //     if (!room) return // socket update must wait to get the full game first

      //     const newRoom = protob.Room.decode(new Uint8Array(data))
      //     // if (!newRoom.seats.length) delete newRoom.seats
      //     // if (_.isEmpty(newRoom.players)) delete newRoom.players
      //     // if (_.isEmpty(newRoom.onlinePlayers)) delete newRoom.onlinePlayers

      //     console.log(`Update room`, newRoom)
      //     const game = { ...roomRef.current, ...newRoom }
      //     trySetRoom(game)
      //   }
      //   catch (err) {
      //     console.log(`Room update error`, err)
      //   }
      // })
      // conn.on('game', (data) => {
      //   try {
      //     console.log('Set game')
      //     setGame(protob.Game.decode(new Uint8Array(data)))
      //   }
      //   catch (err) {
      //     console.log(`Game update error`, err)
      //   }
      // })
      // conn.on('me', (data) => {
      //   try {
      //     setMe(protob.GamePlayer.decode(new Uint8Array(data)))
      //   }
      //   catch (err) {
      //     console.log(`Me update error`, err)
      //   }
      // })
      // conn.on('act', (data) => {
      //   try {
      //     const actions = data.map(d => protob.GameLog.decode(new Uint8Array(d)))
      //     setAction((prev) => ({
      //       queue: [...actions, ...prev.queue],
      //       running: prev.running
      //     }))
      //     setGame((g) => ({
      //       ...g,
      //       time: Date.now()
      //     }))
      //   }
      //   catch (err) {
      //     console.log(`Action update error`, err)
      //   }
      // })
      conn.on('message', receiveMessage)
      conn.on('error', (msg) => notification.error({
        message: msg
      }))

      http.post(`/room/sockets/${conn.id}`).then(() => setIsOnline(true))
    }

    conn.on('connect', onConnected)
    conn.connect()

    conn.on('pong', (startTime) => {
      console.log(`Latency:`, Date.now() - startTime)
    })

    const interval = setInterval(() => {
      conn.emit('ping', Date.now())
    }, 20000)

    return () => {
      conn.disconnect()
      conn.off('connect')
      conn.off('disconnect')
      conn.off('update')
      clearInterval(interval)
    }
  }

  function sendGameRequest(event, request) {
    return socket.current?.send({
      event,
      ...request
    })
  }

  const startNewGame = Utils.autoError(() => http.post('/room/games'))

  const pauseOrResume = Utils.autoError(() => {
    if (room.status === 'PAUSED') {
      return sendGameRequest('RESUME_GAME')
    }
    else {
      return sendGameRequest('PAUSE_GAME')
    }
  })

  const sendMessage = (msg) => {
    const msgContent = msg.data?.text ?? msg.data?.emoji ?? ''
    if (!msgContent?.length || msgContent?.length > 1000) return notification.error({
      message: 'Message content is too long...'
    })

    const id = shortid.generate()
    setMessages((msgs) => [...msgs, {
      id, author: 'me', type: 'text', data: {
        text: `${GetPlayerName(uid)}: ${msgContent}`
      }
    }])

    return sendGameRequest('SEND_MESSAGE', {
      id,
      content: msgContent
    })
  }

  const receiveMessage = (msg) => {
    if (messagesRef.current?.find(_msg => _msg.id === msg.id)) return

    setMessages(msgs => [...msgs, {
      id: msg.id,
      author: msg.author === uid ? 'me' : 'them',
      type: 'text',
      data: {
        text: `${GetPlayerName(msg.author)}: ${msg.content}`
      }
    }])

    if (!showChatRef.current) {
      setNNewMessage(n => n + 1)
      notification.open({
        message: GetPlayerName(msg.author),
        description: msg.content,
        duration: 2,
        style: { padding: '5px 10px' },
        className: 'message-notification'
      })
    }
    else {
      setNNewMessage(0)
    }
  }

  const closeModal = () => setShowingModal('')

  const performAction = Utils.autoError(async (act) => {
    console.log(`Perform action: ${moment().format('DD/MM HH:mm:ss')}`, act)

    const [room, game, me, deck] = [roomRef.current, gameRef.current, meRef.current, gameRef.current?.deck]

    if (act.type === 'ERR') { 
      return notification.error({
          message: 'Error' + (act.playerId ? ` from player ${room.players[act.playerId].name}` : ''),
          description: act.message
      })
    }

    if (act.type === 'PLAY_CARD') {
      const card = game?.deck?.dex?.[act.card]
      if (card.type === 'Defuse') {
        await Swal.fire({ title: `Player ${room.players[act.playerId].name} has played Defuse. Time to put Exploding Kitten back to deck`, timer: 800, showConfirmButton: false })
      }
      else {
        await Swal.fire({ title: `Player ${room.players[act.playerId].name} played ${card?.name}`, timer: 800, showConfirmButton: false })
      }
    }

    if (act.type === 'GOT_EK') {
      await Swal.fire({ title: `Player ${room.players[act.playerId].name} has drawed exploding kitting\nPlease play defuse`, timer: 800, showConfirmButton: false })
    }

    if (act.type === 'DEFUSE') {
      if (act.playerId === uid) {
        await Swal.fire({ title: `Please play DEFUSE`, timer: 500, showConfirmButton: false })
      }
    }

    if (act.type === 'PLAYER_LOST') {
      await Swal.fire({ title: `Player ${room.players[act.playerId].name} has been defeated`, timer: 800, showConfirmButton: false })
    }

    if (act.type === 'PUT_CARD_TO_DECK') {
      await Swal.fire({ title: `Player ${room.players[act.playerId].name} has put card ${game?.deck?.dex?.[act.card]?.name} back to deck`, timer: 800, showConfirmButton: false })
    }

    if (act.type === 'SHUFFLE') {
      await Swal.fire({ title: `Deck shuffled`, timer: 500, showConfirmButton: false })
    }

    if (act.type === 'CHANGE_DIRECTION') {
      await Swal.fire({ title: `The direction has changed to ${act.index < 0 ? 'counter-' : ''}clockwise`, timer: 500, showConfirmButton: false })
    }

    if (act.type === 'STF') {
      if (!act.cards.length) return
      await Swal.fire({ title: `Upcomming cards\n${act.cards.map(c => game.deck.dex[c].name).join(', ')}`, timer: 5000, showConfirmButton: false })
    }

    if (act.type === 'STEAL') {
      const card = game.deck.dex[act.card]
      await Swal.fire({ title: `Player ${room.players[act.playerId]?.name} has stolen a card from ${room.players[_.first(act.playerIds)]?.name}\n${card?.name || ''}`, timer: 1000, showConfirmButton: false })
    }

    if (act.type === 'GAME_OVER') {
      await Swal.fire({ title: `Game ended! Winner: ${room.players[act.playerId].name}`, timer: 800, showConfirmButton: false })
    }

    if (act.type === 'GAME_ERROR') {
      await Swal.fire({ title: `Game ended due to error from player ${room.players[act.playerId]?.name ?? 'Unknown'}` })
    }
  })

  const eventResolver = (event) => {
    if (event.type === 'PutCardBackEvent') {
      const sendRequest = (idx) => () => sendGameRequest('ACTION', { type: 'PUT_CARD_BACK', card: event.card, index: idx })
      const deckCount = event.deckCount
      return (<>
        {_.range(5).map(idx => idx <= deckCount && <GameControlButton style={{minWidth: 0}} onClick={sendRequest(idx)} >{idx}</GameControlButton>)}
        {deckCount >= 1 && <GameControlButton style={{minWidth: 0}} onClick={sendRequest(deckCount)} >Bottom</GameControlButton>}
        {deckCount >= 2 && <GameControlButton style={{minWidth: 0}} onClick={sendRequest(deckCount - 1)} >Bottom-1</GameControlButton>}
        <GameControlButton style={{minWidth: 0}} onClick={sendRequest(undefined)}>Random</GameControlButton>
      </>)
    }
    if (event.type === 'SelectOtherPlayerEvent') {
      return <>
        {game.players?.map(p => p.status === 'P' && p.id !== uid && <GameControlButton style={{ margin: '5px' }} onClick={() => {
          sendGameRequest('ACTION', { type: 'SELECT_PLAYER', affectedPlayerId: [p.id] })
        }}>{room.players[p.id].name}</GameControlButton>)}
      </>
    }
  }

  useEffect(() => {
    if (!room?.hasGame) {
      setGame(null)
      setMe(null)
    }
  }, [room])

  if (!room || !uid) return <MainGame room={room} uid={uid} />

  return (
    <>
      {contextHolder}
      <div className={portrait ? 'port' : 'land'}>
        <MainGame
          isOnline={isOnline && socket.current?.connected}
          sendGameRequest={sendGameRequest}
          hideChat={() => setShowChat(false)}
          setScale={setScale}
          startNewGame={startNewGame}
          eventResolver={eventResolver}
          uid={uid}
        >
          {/* <Menu
            style={{ transform: `scale(${menuScale})`, transformOrigin: 'top left' }}
            openLedger={() => room && setShowingModal('LEDGER')}
            openHistory={() => room && setShowingModal('LOGS')}
            openPreferences={() => room && setShowingModal('PREFERENCES')}
            away={hasSeat && me.status === 'ACTIVE' && away}
            leaveSeat={hasSeat && me.status === 'AWAY' && !room.requests.seatOut.includes(mySeatIndex) && leaveSeat}
            unLeaveSeat={hasSeat && room.requests.seatOut.includes(mySeatIndex) && leaveSeat}
          />
          {isOwner && room.status !== 'CLOSED' && <AdminControl
            style={{ transform: `scale(${menuScale})`, transformOrigin: 'top right' }}
            gameActive={room.status !== 'STOPPED'}
            stopped={room.requests.stopGame}
            stopGame={stopGame}
            pauseOrResume={pauseOrResume}
            managePlayer={() => setShowingModal('PLAYER_MANAGER')}
            openSettings={() => setShowingModal('SETTINGS')}
          />}
          <GameControl game={room} settings={settings} action={controlAction}
            quickBets={prefs.enableQuickBet ? prefs.quickBets.map(qb => qb * room.settings.bigBlind) : null}
            style={{ transform: `scale(${scale})`, transformOrigin: 'bottom right' }}
          /> */}
        </MainGame>
        <Modal title={<>
          <span>Game Ledger</span>
        </>}
          centered
          open={showingModal === 'LEDGER'}
          onOk={closeModal}
          onCancel={closeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={portrait}
          width={modalWidth}
        >
          <Ledger game={room}></Ledger>
        </Modal>
        <Modal title='History'
          centered
          open={showingModal === 'LOGS'}
          onOk={closeModal}
          onCancel={closeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={portrait}
          width={modalWidth}
          destroyOnClose
        >
          <Logs game={room} http={http}></Logs>
        </Modal>
        <Modal title="Players" centered
          open={showingModal === 'PLAYER_MANAGER'}
          onOk={closeModal}
          onCancel={closeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={portrait}
          width={modalWidth}
        >
          <PlayerManager game={room} sendRequest={sendGameRequest} close={closeModal}></PlayerManager>
        </Modal>
        <Modal title="Admin Settings" centered
          open={showingModal === 'SETTINGS'}
          onCancel={closeModal}
          closable={true}
          footer=''
          width={modalWidth}
        >
          <AdminSettings settings={room.settings} sendRequest={sendGameRequest} close={closeModal} />
        </Modal>
        <Modal title="Preferences" centered
          open={showingModal === 'PREFERENCES'}
          onCancel={closeModal}
          closable={true}
          footer=''
          width={modalWidth}
        >
          <Preferences prefs={prefs} setPrefs={(prefs) => {
            setPrefs(prefs)
            Storage.setPreferences(prefs)
          }} close={closeModal} bb={room?.settings.bigBlind} />
        </Modal>
        {room?.status === 'PAUSED' && <div className='gamePausedLayer' onClick={() => { }}>
          <span className='gamePausedTitle'>Game Paused</span>
          {room.ownerId !== uid && <span className='gamePausedMessage'>The game has been paused. Please contact the game owner to resume</span>}
          {room.ownerId === uid && <PlayCircleOutlined style={{ color: 'white', fontSize: '80px' }} onClick={pauseOrResume} />}
        </div>}
        <Launcher
          agentProfile={{
            teamName: 'PokerAA - Poker for funs',
            imageUrl: '/logo48.png'
          }}
          handleClick={() => {
            setNNewMessage(0)
            setShowChat(!showChat)
            notification.destroy()
          }}
          newMessagesCount={nNewMessage}
          isOpen={showChat}
          onMessageWasSent={sendMessage}
          messageList={messages}
          mute
          showEmoji
        />
      </div>
    </>
  );
}

export default Game;
