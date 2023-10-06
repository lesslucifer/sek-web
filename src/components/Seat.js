
import _ from 'lodash';
import { CloseCircleOutlined, LogoutOutlined, UserOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import './Seat.css'
import Card from './Card'
import Swal from 'sweetalert2';
import Utils from '../utils/utils'
import TimeBar from './TimeBar';
import Storage from '../utils/storage';

function Seat(props) {
    const { index, displayIndex, player, gamePlayer, cards, handId } = props
    const { takeSeat } = props
    const { winner } = props
    const { dealer } = props
    const { mode, isOnline } = props
    const { timer } = props
    const { requests } = props

    const uid = Storage.getUserId()
    const isPlaying = !!cards?.length
    const isShowCards = isPlaying && (player.status !== 'F' || player.showCard || player.id === uid)
    const betting = player?.betting
    const stack = (player?.stack ?? gamePlayer?.stack) - (player?.betting ?? 0)
    
    const statusIcon = () => {
        const style = {fontSize: 35, color: '#9a9a9a'}
        if (player?.status === 'F') return <CloseCircleOutlined style={style} />
        if (gamePlayer?.status === 'AWAY') return <LogoutOutlined  style={style}/>
        if (_.values(requests.seatIn).includes(index)) return <VerticalAlignBottomOutlined  style={style}/>
        return <UserOutlined  style={style}/>
    }

    const statusText = () => {
        const sttText = () => {
            if (!player && !gamePlayer) return
            if (requests.seatOut.includes(index)) return 'LEAVING'
            if (gamePlayer?.status === 'AWAY') return 'AWAY'
            if (player?.status === 'F') return 'FOLDED'
            if (_.values(requests.seatIn).includes(index)) return 'WAITING'
            if (!isPlaying) return 'READY'
        }

        return [sttText(), isOnline ? '' : '(OFFLINE)'].filter(txt => !!txt).join(' ')
    }

    const onTakeSeatClick = Utils.autoError(async () => {
        if (!takeSeat) return
        const res = await Swal.fire({
            html: `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <h3>Take seat ${index + 1}</h3>
                    <span>Name: </span> <input id="swal-takeSeat-nameInput" class="swal2-input" type="text" value="${Storage.getLastName()}">
                    <span>Buy In: </span> <input id="swal-takeSeat-buyInInput" class="swal2-input" type="number" value="1000">
                </div>
            `,
            preConfirm: function () {
                const name = document.getElementById('swal-takeSeat-nameInput').value
                const buyIn = parseInt(document.getElementById('swal-takeSeat-buyInInput').value)
                if (name?.length < 2 || name?.length > 25) return Swal.showValidationMessage('Name must have at least 2 and at most 25 characters')
                if (!buyIn || buyIn <= 0) return Swal.showValidationMessage('Buy in must be greater than zero')
                return Promise.resolve({
                    name,
                    buyIn,
                })
            },
            didOpen: function () {
                document.getElementById('swal-takeSeat-buyInInput').focus()
                document.getElementById('swal-takeSeat-buyInInput').select()
            },
            showCancelButton: true,
        })

        if (!res.isConfirmed) return

        Storage.setLastName(res.value.name)
        takeSeat?.(index, res.value.buyIn, res.value.name)
    })

    const renderEmptySeat = () => (
    <div className='seatContainer empty' onClick={() => onTakeSeatClick()} style={{cursor: takeSeat ? 'pointer' : 'default'}}>
        <div className='seatNum seatHighlight'>
            <span>{index + 1}</span>
        </div>
        <div className='seatText seatHighlight'>
            <span>SIT</span>
        </div>
    </div>)

    const renderPlayerStatus = () => (<div className='playerStatusContainer'>
        {statusIcon()}
        <span className='playerStatusText'>{statusText()}</span>
    </div>)

    const renderPlayerCards = () => {
        const getCardMode = (idx) => {
            if (mode === 'winner' && player.result) {
                return player.result.holeCardIndexes?.includes(idx) ? 'highlight' : 'down'
            }

            if (!isOnline) return 'offline'

            if (player.status === 'F' && !player.showCard) return 'down'
        }

        const stt = statusText()

        return (<div className='playerCard'>
            <div className='playerCard1' style={{zIndex: getCardMode(0) === 'highlight' ? 98 : 0}}>
                <Card key={`${handId}:${player?.id}:0`} mode={getCardMode(0)} card={cards[0]} />
            </div>
            <div className='playerCard2' style={{zIndex: getCardMode(1) === 'highlight' ? 99 : 0}}>
                <Card key={`${handId}:${player?.id}:1`} mode={getCardMode(1)} card={cards[1]} />
            </div>
            {stt && <div className='cardStatus'>
                <span>{stt}</span>
            </div>}
        </div>)
    }

    if (!player && !gamePlayer) return renderEmptySeat()

    return (
        <div className={`seatContainer ${mode}`}>
            {!!timer && mode === 'playing' && <div className='seatTimeBar'>
                <TimeBar {...timer} />
            </div>}
            { isShowCards ? renderPlayerCards() : renderPlayerStatus()}
            <div className='playerStackContainer'>
                <span className='playerName'>{gamePlayer?.name}</span>
                <span className='playerStack'>
                    {(!isPlaying || stack > 0) ? stack - (winner ?? 0) : 'All In'}
                    {winner > 0 && <span className='playerWinAmount'>+{winner}</span>}
                </span>
            </div>
            { !_.isNil(betting) && <p className={`bettingAmount seat${displayIndex}`}>
                <span>{betting > 0 ? betting : 'Check'}</span>
            </p> }
            { dealer && <div className={`dealer seat${displayIndex}`}>
              <div className="dealerButton"></div>
            </div>}
        </div>
    );
}

export default Seat;
