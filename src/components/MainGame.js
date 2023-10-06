import { RedoOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import _, { get } from 'lodash';
import Seat from '../components/Seat';
import usePortrait from '../hooks/usePortrait';
import useWindowSize from '../hooks/useWindowSize';
import { MASKED_CARD } from '../models/game';
import CommunityCards from './CommunityCards';
import './MainGame.css';

function MainGame(props) {
    const portrait = usePortrait()
    const [vw, vh] = useWindowSize()
    const { game, uid, myCards, isOnline } = props
    const { takeSeat, hideChat } = props
  
    const nSeats = 10
  
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
  
    const calcPortraitPotLocation = () => {
      if (!portrait) return
      const tableHeight = vh * 0.8
      const bgHeight = Math.max(vw * 43 / 27, tableHeight)
      const margin = (tableHeight - bgHeight) * 0.5
      return margin + 0.39 * bgHeight
    }
  
    const { eh, ew, mh, mv, scale } = calcCanvasSize()
    setTimeout(() => props.setScale?.(scale))
  
    const mySeatIndex = game?.seats?.indexOf(uid)
    const hasSeat = mySeatIndex >= 0
    const players = _.keyBy(game?.hand?.players ?? [], p => p.id)
  
    const getCommunityCardMode = (idx) => {
      if (_.get(game, 'hand.status') !== 'SD') return
      if (game.hand.round !== 'D') return
      return Object.keys(game.hand.winners).find(wid => players[wid]?.result?.communityCardsIndexes?.includes(idx)) ? 'highlight' : 'down'
    }

    const renderSeat = (s, displayIndex) => {
      const getPlayerIdAtSeat = (seat) => {
        return game.seats[seat] || _.first(_.entries(game.requests.seatIn).find(([pid, s]) => s === seat))
      }
  
      const getSeatMode = (playerId) => {
        if (!playerId) return 'empty'
  
        if (_.get(game, 'hand.status') === 'SD') {
          return game.hand?.winners[playerId] ? 'winner' : 'waiting'
        }
  
        const currentPlayerId = _.get(game, 'hand.currentPlayer')
        if (playerId === currentPlayerId) return 'playing'
        return 'waiting'
      }
  
      const getPlayerCards = (pid) => {
        if (pid === uid && myCards) return myCards
        const cards = game.hand?.playerCards?.find(pc => pc.id === pid)
        if (cards) return cards.cards
        if (players[pid]) return [MASKED_CARD, MASKED_CARD]
        return null
      }
  
  
      const pid = getPlayerIdAtSeat(s)
      if (game.hand && !pid && game.seats.includes(uid)) return
      if (!pid && game.status === 'CLOSED') return
  
      return (<Seat
        index={s}
        displayIndex={displayIndex}
        player={players[pid]}
        gamePlayer={game.players[pid]}
        handId={game.hand?.id}
        cards={getPlayerCards(pid)}
        winner={game.hand?.winners?.[game.seats[s]]}
        mode={getSeatMode(pid)}
        isOnline={isOnline} // TODO: Fix online players
        takeSeat={!hasSeat && !game.requests.seatIn[uid] && takeSeat}
        timer={game.hand?.timeOutAt && { begin: game.hand.beginActionTime, current: Math.max(game.time, game.hand?.time ?? 0), end: game.hand.timeOutAt }}
        dealer={game.hand && game.dealerSeat === s}
        requests={game.requests}
      />)
    }
  
    const onKeyPressed = (e) => {
      const elems = document.getElementsByClassName(`key-${e.keyCode}`)
      for (const elem of elems) {
        elem.click()
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
  
    if (!game || !uid) return renderLoadingPage()
  
    return (
      <>
        <div id="main-container" className={portrait ? 'port' : 'land'} tabIndex={-1} onKeyDown={onKeyPressed}>
          <div id="canvas" style={{
            width: ew,
            height: eh,
            margin: `${mv}px ${mh}px`
          }} onClick={hideChat}>
            <div id="table">
              {_.range(nSeats).map(s => [s, (s + nSeats - Math.max(0, mySeatIndex)) % nSeats]).map(([s, ps]) => (
                <div className="seat" id={`seat${ps}`} style={{ transform: `scale(${scale})` }} key={ps}>
                  {renderSeat(s, ps)}
                </div>
              ))}
              {game.hand && <div className='potContainer' style={portrait ? { top: `${calcPortraitPotLocation()}px` } : {}}>
                <div className='mainPot'>
                  <span>{game.hand.committedPot}</span>
                </div>
              </div>}
              {game.hand?.communityCards && <CommunityCards className='mainGameCommunityCards' style={{ transform: `scale(${scale})` }}
                cards={game.hand.communityCards}
                modes={_.range(game.hand.communityCards.length).map(i => getCommunityCardMode(i))}>
              </CommunityCards>}
              {game.status === 'CLOSED' && <div className='gameSeed'>
                <div className='gameSeedMessage' style={{fontSize: 30 * scale}}>THE GAME IS CLOSED</div>
                <div className='gameSeedMessage' style={{fontSize: 30 * scale}}>Game Seed: <a className='gameSeedSeed' href={`/deck?seed=${game.seed}`}>{game.seed}</a></div>
              </div>}
            </div>
            {props.children}
          </div>
        </div>
      </>
    );
}

export default MainGame;
