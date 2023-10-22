import { RedoOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import usePortrait from '../hooks/usePortrait';
import useWindowSize from '../hooks/useWindowSize';
import { gameState } from '../recoil-models/game';
import { meState } from '../recoil-models/me';
import { roomState } from '../recoil-models/room';
import Storage from '../utils/storage';
import Utils from '../utils/utils';
import GameControlButton from './GameControlButton';
import './MainGame.css';
import TimeBar from './TimeBar';

function MainGame(props) {
  const portrait = usePortrait()
  const [vw, vh] = useWindowSize()
  const [room] = useRecoilState(roomState)
  const [game] = useRecoilState(gameState)
  const [me] = useRecoilState(meState)
  const { hideChat, startNewGame, sendGameRequest, eventResolver } = props
  const { uid } = props

  const mySeatIndex = room?.seats?.indexOf(uid) ?? -1

  const calcCanvasSize = () => {
    if (!portrait) {
      const aspectRatio = 9 / 16;
      const eh = Math.min(vh, vw * aspectRatio)
      const ew = eh / aspectRatio
      const mh = Math.max(0, (vw - ew) / 2)
      const mv = Math.max(0, (vh - eh) / 2)
      const scale = ew / 1260
      return { eh, ew, mh, mv, scale }
    }

    return {
      eh: vh,
      ew: vw,
      mh: 0,
      mv: 0,
      scale: Math.min(1, vw / 630)
    }
  }

  const { eh, ew, mh, mv, scale } = calcCanvasSize()
  setTimeout(() => props.setScale?.(scale))

  const onKeyPressed = (e) => {
    const elems = document.getElementsByClassName(`key-${e.keyCode}`)
    for (const elem of elems) {
      elem instanceof HTMLElement && elem.click()
    }
  }

  const takeSeat = Utils.autoError(async () => {
    if (game || mySeatIndex >= 0) return
    const res = await Swal.fire({
      html: `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <h3>Take seat</h3>
                  <span>Name: </span> <input id="swal-takeSeat-nameInput" class="swal2-input" type="text" value="${Storage.getLastName()}">
                  <span>Seat: </span> <input id="swal-takeSeat-seatInput" class="swal2-input" type="number" value="${room.seats.indexOf("") + 1}">
              </div>
          `,
      preConfirm: () => {
        const nameElem = document.getElementById('swal-takeSeat-nameInput')
        const name = (nameElem instanceof HTMLInputElement) && nameElem.value
        const seatElem = document.getElementById('swal-takeSeat-seatInput')
        const seat = (seatElem instanceof HTMLInputElement) && parseInt(seatElem.value)
        if (name?.length < 2 || name?.length > 25) return Swal.showValidationMessage('Name must have at least 2 and at most 25 characters')
        if (!seat || seat <= 0 || seat > 9) return Swal.showValidationMessage('Buy in must be from 1-9')
        return Promise.resolve({
          name,
          seat: seat - 1,
        })
      },
      didOpen: () => {
        const elem = document.getElementById('swal-takeSeat-seatInput')
        if (!(elem instanceof HTMLInputElement)) return
        elem.focus()
        elem.select()
      },
      showCancelButton: true,
    })

    if (!res.isConfirmed) return
    if (!res.value) return

    Storage.setLastName(res.value.name)
    sendGameRequest('TAKE_SEAT', { name: res.value.name, seat: res.value.seat })
  })

  const leaveSeat = () => {
    if (mySeatIndex < 0) return
    sendGameRequest('LEAVE_SEAT')
  }

  const playCard = (card) => {
    if (card.type === 'Defuse') {
      sendGameRequest('ACTION', { type: 'DEFUSE', card: card.dex })
    }
    else {
      sendGameRequest('ACTION', { type: 'PLAY_CARD', card: card.dex })
    }
  }

  const renderLoadingPage = () => {
    return (
      <>
        <div id="main-container" className={portrait ? 'port' : 'land'} tabIndex={-1} onKeyDown={onKeyPressed}>
          <div id="canvas" style={{
            width: ew,
            height: eh,
            margin: `${mv}px ${mh}px`
          }}>
            <div id="table">
              <Spin tip="Loading" size="large"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(2)', color: '#050505aa' }}
                indicator={<RedoOutlined spin />}
              >
              </Spin>
            </div>
          </div>
        </div>
      </>
    );
  }

  const renderOtherPlayer = (player, active) => {
    if (!player || player.status !== 'P') return
    const activeStyle = active ? { color: 'red'} : {}
    return <div key={player.id} style={{ margin: '10px', padding: '4px', width: '15%', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid rgba(140, 140, 140, 0.35)', borderRadius: '4px', ...activeStyle }}>
      <div>Name: {room.players[player.id]?.name}</div>
      <div>NCard: {player.nCard}</div>
    </div>
  }

  const renderDeck = () => {
    return (<div style={{ alignSelf: 'center' }}>
      <GameControlButton style={{ height: '80px' }} onClick={() => sendGameRequest('ACTION', { type: 'DRAW' })}>Deck ({game.deck?.nCard})</GameControlButton>
    </div>)
  }

  const renderMe = () => {
    // console.log(`Render me`, room, game, me)
    if (!me) return
    const activeStyle = game.currentPlayerId === uid ? { color: 'red'} : {}
    return (<div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', flexWrap: 'wrap' }}>
      { me.cards.map(c => <GameControlButton key={c} style={{ margin: '10px', width: '80px', height: '40px', ...activeStyle }}
        onClick={() => playCard(game.deck.dex[c])}>
        { game.deck.dex[c].name }
      </GameControlButton>)}
    </div>)
  }

  if (!room || !uid) return renderLoadingPage()

  return (
    <>
      <div id="main-container" className={portrait ? 'port' : 'land'} tabIndex={-1} onKeyDown={onKeyPressed}>
        <div id="canvas" style={{
          width: ew,
          height: eh,
          margin: `${mv}px ${mh}px`
        }} onClick={hideChat}>
          {!game && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {room.ownerId === uid && <div className='newGameButton' onClick={startNewGame}>Start</div>}
            {mySeatIndex >= 0 && <GameControlButton onClick={leaveSeat}>Seat: {mySeatIndex + 1}</GameControlButton>}
            {mySeatIndex < 0 && <GameControlButton onClick={takeSeat}>Join</GameControlButton>}
          </div>}
          {game && <div id="table" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {game.players?.map((p, i) => p.id !== uid && renderOtherPlayer(p, p.id === game.currentPlayerId))}
            {game.event && <div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                <span style={{margin: '5px'}}>{game.event.type} ({game.event.id})</span>
                {eventResolver(game.event)}
              </div>
              <TimeBar begin={game.event.beginAt} end={game.event.timeoutAt} current={game.time} />
            </div>}
            {renderDeck()}
            {renderMe()}
          </div>}
        </div>
      </div>
    </>
  );
}

export default MainGame;
