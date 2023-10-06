import { PlayCircleOutlined } from '@ant-design/icons';
import { Modal, notification } from 'antd';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Launcher } from 'react-chat-window';
import { useNavigate, useParams } from "react-router-dom";
import useStateRef from 'react-usestateref';
import shortid from 'shortid';
import io from 'socket.io-client';
import Swal from 'sweetalert2';
import newHTTP from '../api/http';
import Audios from '../audios';
import AdminControl from '../components/AdminControl';
import GameControl from '../components/GameControl';
import MainGame from '../components/MainGame';
import Menu from '../components/Menu';
import usePortrait from '../hooks/usePortrait';
import { GetPlayerName, UpdatePlayerName } from '../models/game';
import protob from '../proto/game.proto';
import { SOCKET_URL } from '../utils/env';
import Storage from '../utils/storage';
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

  const [game, setGame, gameRef] = useStateRef(null)
  const [uid, setUid] = useState(null)
  const [myCards, setMyCards] = useState({})
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

  const menuScale = 1.5 * scale
  const modalWidth = portrait ? '98%' : '80%'

  const mySeatIndex = game?.seats.indexOf(uid)
  const hasSeat = mySeatIndex >= 0
  const me = game?.players?.[uid]
  const isOwner = game?.ownerId === uid
  const players = _.keyBy(game?.hand?.players ?? [], p => p.id)
  UpdatePlayerName(game)

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
    if (!game) reloadGame().catch(() => {
      Swal.fire('Error', 'Cannot load game. Game not found!', 'error').then(() => {
        navigate('/')
      })
    })
    return setupSocket()
  })), [uid])

  useEffect(() => {
    onGameUpdate(game)
  }, [game])

  const trySetGame = (newGame, source) => {
    const steps = _.get(newGame, 'hand.steps')
    if (newGame.hand) {
      _.set(newGame, 'hand.steps', [])
    }

    if (source !== 'api') {
      console.log(`New game`, newGame)
    }

    if (newGame?.id === params.gameid && newGame.time > (gameRef.current?.time ?? -1)) {
      setGame(newGame)

      console.log('Steps', steps)
      if (source !== 'api' && steps?.length > 0) {
        playSounds(steps)
      }
    }
  }

  const playSounds = async (steps) => {
    console.log(prefs)
    const types = _.countBy(steps, s => s.type)
    if (types[0] > 0) await Audios.Start?.play(prefsRef.current.volume)

    if (types[1] > 0) await Audios.Deal?.play(prefsRef.current.volume)

    if (types[2] > 0) {
      await Audios.Bet?.play(prefsRef.current.volume) 
    }

    if (types[3] > 0) await Audios.Bet?.play(prefsRef.current.volume)

    if (types[4] > 0) await Audios.Result?.play(prefsRef.current.volume)
  }

  const reloadGame = () => http.get('/game').then(resp => {
    trySetGame(resp.data?.data, 'api')
    if (!resp.data?.data) throw new Error(`Cannot find game ${params.gameid}`)
  })

  const setupSocket = () => {
    if (socket.current) return

    const conn = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10,
      autoConnect: false
    })

    socket.current = conn

    conn.connect()
    conn.on('connect', () => {
      conn.on('disconnect', () => {
        setIsOnline(false)
      })

      conn.on('update_game', (update) => {
        try {
          if (!gameRef.current) return // socket update must wait to get the full game first

          const data = protob.Game.decode(new Uint8Array(update))
          if (!data.seats.length) delete data.seats
          if (_.isEmpty(data.players)) delete data.players
          if (_.isEmpty(data.onlinePlayers)) delete data.onlinePlayers
          if (data.noHand) data.hand = null

          console.log(`Update game`, data)
          const game = { ...gameRef.current, ...data }
          trySetGame(game, 'socket')
        }
        catch (err) {
          console.log(`Game update error`, err)
        }
      })
      conn.on('update_hand', (update) => {
        try {
          const data = protob.GameHandUpdate.decode(new Uint8Array(update))
          console.log(`Update hand`, data)
          const game = { ...gameRef.current, ...data }
          trySetGame(game, 'socket')
        }
        catch (err) {
          console.log(`Game update error`, err)
        }
      })
      conn.on('cards', (update) => {
        try {
          const data = protob.MyCardsUpdate.decode(new Uint8Array(update))
          console.log(`Update cards`, data)
          if (!isNaN(data.hand) && data.cards?.length) {
            setMyCards(cards => ({ ...cards, [data.hand]: data.cards }))
          }
        }
        catch (err) {
          console.log(`Game update error`, err)
        }
      })
      conn.on('message', receiveMessage)
      conn.on('error', (msg) => notification.error({
        message: msg
      }))

      http.post(`/game/sockets/${conn.id}`).then(() => setIsOnline(true))
    })

    conn.on('pong', (startTime) => {
      console.log(`Latency:`, Date.now() - startTime)
    })

    const interval = setInterval(() => {
      conn.emit('ping', Date.now())
    }, 5000)

    return () => {
      conn.disconnect()
      conn.off('connect')
      conn.off('disconnect')
      conn.off('update')
      clearInterval(interval)
    }
  }

  function sendGameRequest(type, request) {
    return socket.current?.send({
      type,
      ...request
    })
  }

  const takeSeat = Utils.autoError((idx, buyIn, name) => sendGameRequest('TAKE_SEAT', { seat: idx, buyIn, name }))

  const away = Utils.autoError(() => {
    return sendGameRequest('SET_PLAYER_STATUS', { player: uid, status: 'AWAY' })
  })

  const leaveSeat = Utils.autoError(() => {
    if (game.requests.seatOut.includes(mySeatIndex)) {
      return sendGameRequest('UNLEAVE_SEAT')
    }
    else {
      return sendGameRequest('LEAVE_SEAT')
    }
  })

  const stopGame = Utils.autoError(() => {
    if (game.requests.stopGame) {
      return sendGameRequest('UNSTOP_GAME')
    }
    else {
      return sendGameRequest('STOP_GAME')
    }
  })

  const pauseOrResume = Utils.autoError(() => {
    if (game.status === 'PAUSED') {
      return sendGameRequest('RESUME_GAME')
    }
    else {
      return sendGameRequest('PAUSE_GAME')
    }
  })

  const confirmDarkFoldIfNeeded = async () => {
    const gameBetting = game.hand?.betting ?? 0
    const playerBetting = players[uid]?.betting ?? 0
    const isCheckable = (gameBetting <= playerBetting)
    if (!isCheckable) return true

    const res = await Swal.fire({
      title: 'Do you really want to fold ?',
      text: 'You can disable it in the preferences',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I Fold!',
      cancelButtonText: 'No'
    })

    return res.isConfirmed
  }

  const performAction = async (action, amount, force) => {
    if (!force && action === 'FOLD' && !prefs.darkFold) {
      const isConfirmed = await confirmDarkFoldIfNeeded()
      if (!isConfirmed) return
    }
    if (!force && action === 'BET' && prefs.betThreshold > 0 && prefs.betThreshold * game.settings.bigBlind <= amount) {
      const res = await Swal.fire({
        title: `Do you really want to bet ${amount} chips ?`,
        text: 'You can disable it in the preferences',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, I Bet!',
        cancelButtonText: 'No'
      })
      if (!res.isConfirmed) return
    }

    return await sendAction(action, amount)
  }

  const sendAction = (action, amount) => sendGameRequest('TAKE_ACTION', {
    action,
    amount
  })

  const isSettingMatchWithCurrentHand = () => {
    return game.hand && _.get(game, 'hand.id') === settings.hand && _.get(game, 'hand.round') === settings.round
  }

  const controlAction = Utils.autoError(async (action, amount) => {
    if (action === 'SHUFFLE_SEAT') {
      sendGameRequest('SHUFFLE_SEATS')
    }
    if (action === 'REVEAL_SEED') {
      sendGameRequest('REVEAL_SEED')
      reloadGame()
    }
    else if (action === 'START_GAME') {
      sendGameRequest('START_GAME')
    }
    else if (action === 'I_AM_BACK') {
      sendGameRequest('SET_PLAYER_STATUS', { player: uid, status: 'ACTIVE' })
    }
    else if (action === 'S_CHECK_OR_FOLD') {
      const autoAction = (!isSettingMatchWithCurrentHand() || settings.autoAction !== 'CHECK_OR_FOLD') ? 'CHECK_OR_FOLD' : ''
      setSettings({ ...settings, autoAction, hand: game.hand?.id, round: game.hand?.round })
    }
    else if (action === 'S_CHECK') {
      const autoAction = (!isSettingMatchWithCurrentHand() || settings.autoAction !== 'CHECK') ? 'CHECK' : ''
      setSettings({ ...settings, autoAction, hand: game.hand?.id, round: game.hand?.round })
    }
    else if (action === 'S_FOLD') {
      const confirmedToFold = settings.autoAction === 'FOLD' || await confirmDarkFoldIfNeeded()
      if (confirmedToFold) {
        const autoAction = (!isSettingMatchWithCurrentHand() || settings.autoAction !== 'FOLD') ? 'FOLD' : ''
        setSettings({ ...settings, autoAction, hand: game.hand?.id, round: game.hand?.round })
      }
    }
    else if (action === 'BET') {
      await performAction('BET', amount)
    }
    else if (action === 'FOLD') {
      await performAction('FOLD')
    }
    else if (action === 'SHOW_CARDS') {
      sendGameRequest('SHOW_CARDS')
    }
  })

  const onGameUpdate = Utils.autoError(async (game) => {
    updateMyCards(game)

    if (!game) return
    if (!showChat && !_.isEmpty(myCards) && !showingModal) document.getElementById('main-container')?.focus()
    if (_.get(game, 'hand.currentPlayer') === uid && settings.autoAction && isSettingMatchWithCurrentHand(game)) { // auto play
      const gameBetting = game.hand?.betting ?? 0
      const playerBetting = players[uid]?.betting ?? 0
      const isCheckable = (gameBetting <= playerBetting)
      setSettings({ ...settings, autoAction: '', hand: null, round: null })
      if (settings.autoAction === 'FOLD') {
        await performAction('FOLD', undefined, true)
      }
      else if (settings.autoAction === 'CHECK' && isCheckable) {
        await performAction('BET', game.hand?.betting)
      }
      else if (settings.autoAction === 'CHECK_OR_FOLD') {
        if (isCheckable) {
          await performAction('BET', game.hand?.betting)
        }
        else {
          await performAction('FOLD', undefined, true)
        }
      }
    }
  })

  const updateMyCards = async (game) => {
    try {
      if (_.isNil(game?.hand?.id) || !game.hand.players.find(p => p.id === uid)) return

      if (!myCards[game.hand.id]) {
        sendGameRequest('REQ_CARDS')
      }
    }
    catch (err) {
      console.log(err)
      Swal.fire('Game error!', 'Cannot get your cards! The page will be reloaded', 'error').then(() => window.location.reload())
    }
  }

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

  if (!game || !uid) return <MainGame game={game} uid={uid} />

  return (
    <>
      {contextHolder}
      <div className={portrait ? 'port' : 'land'}>
        <MainGame
          game={game}
          uid={uid}
          myCards={myCards[game.hand?.id]}
          isOnline={isOnline && socket.current?.connected}
          takeSeat={takeSeat}
          hideChat={() => setShowChat(false)}
          setScale={setScale}
        >
          <Menu
            style={{ transform: `scale(${menuScale})`, transformOrigin: 'top left' }}
            openLedger={() => game && setShowingModal('LEDGER')}
            openHistory={() => game && setShowingModal('LOGS')}
            openPreferences={() => game && setShowingModal('PREFERENCES')}
            away={hasSeat && me.status === 'ACTIVE' && away}
            leaveSeat={hasSeat && me.status === 'AWAY' && !game.requests.seatOut.includes(mySeatIndex) && leaveSeat}
            unLeaveSeat={hasSeat && game.requests.seatOut.includes(mySeatIndex) && leaveSeat}
          />
          {isOwner && game.status !== 'CLOSED' && <AdminControl
            style={{ transform: `scale(${menuScale})`, transformOrigin: 'top right' }}
            gameActive={game.status !== 'STOPPED'}
            stopped={game.requests.stopGame}
            stopGame={stopGame}
            pauseOrResume={pauseOrResume}
            managePlayer={() => setShowingModal('PLAYER_MANAGER')}
            openSettings={() => setShowingModal('SETTINGS')}
          />}
          <GameControl game={game} settings={settings} action={controlAction}
            quickBets={prefs.enableQuickBet ? prefs.quickBets.map(qb => qb * game.settings.bigBlind) : null}
            style={{ transform: `scale(${scale})`, transformOrigin: 'bottom right' }}
          />
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
          <Ledger game={game}></Ledger>
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
          <Logs game={game} http={http}></Logs>
        </Modal>
        <Modal title="Players" centered
          open={showingModal === 'PLAYER_MANAGER'}
          onOk={closeModal}
          onCancel={closeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          closable={portrait}
          width={modalWidth}
        >
          <PlayerManager game={game} sendRequest={sendGameRequest} close={closeModal}></PlayerManager>
        </Modal>
        <Modal title="Admin Settings" centered
          open={showingModal === 'SETTINGS'}
          onCancel={closeModal}
          closable={true}
          footer=''
          width={modalWidth}
        >
          <AdminSettings settings={game.settings} sendRequest={sendGameRequest} close={closeModal} />
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
          }} close={closeModal} bb={game?.settings.bigBlind} />
        </Modal>
        {game?.status === 'PAUSED' && <div className='gamePausedLayer' onClick={() => { }}>
          <span className='gamePausedTitle'>Game Paused</span>
          {game.ownerId !== uid && <span className='gamePausedMessage'>The game has been paused. Please contact the game owner to resume</span>}
          {game.ownerId === uid && <PlayCircleOutlined style={{ color: 'white', fontSize: '80px' }} onClick={pauseOrResume} />}
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
