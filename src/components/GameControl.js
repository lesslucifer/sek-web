
import _, { last } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import GameControlButton from './GameControlButton';
import Storage from '../utils/storage'
import './GameControl.css'
import usePortrait from '../hooks/usePortrait';
import Utils from '../utils/utils';

function GameControl(props) {
    const portrait = usePortrait()
    const [showRaise, setShowRaise] = useState(false)
    const [raiseAmount, setRaiseAmount] = useState(0)
    const lastClickRef = useRef(0)
    const uid = Storage.getUserId()

    const game = props.game
    const quickBets = props.quickBets
    const settings = props.settings
    
    const pot = game.hand?.fullPot ?? 0
    const player = game.hand?.players?.find(p => p.id === uid)
    const betting = game.hand?.betting ?? 0
    const call = (game.hand?.betting ?? 0) - (player?.betting ?? 0)
    const minRaise = (betting + game.hand?.minRaise) ?? 0
    const stack = player?.stack ?? 0
    const raises = [
        { text: 'Min raise', value: minRaise },
        { text: '1/2 pot', value: parseInt(pot * 0.5) },
        { text: '3/4 pot', value: parseInt(pot * 0.75) },
        { text: 'POT', value: pot },
        { text: 'All in', value: stack }
    ]
    const isDisabled = !game?.hand?.currentPlayer

    useEffect(() => {
        if (showRaise) {
            const input = document.getElementById('yourBetInput')
            if (!portrait) input.focus()
            setTimeout(() => input.select())
        }
     }, [showRaise]);

    const controlMode = () => {
        console.log(game, uid)
        if (!game || !uid || game.status === 'CLOSED') return
        
        if (game.players[uid]?.status === 'AWAY') return 'AWAY'
        if (game.hand?.status === 'SD' && player) return 'SHOW_DOWN'
        if (!game.seats.includes(uid)) return
        if (game.hand?.players?.find?.(p => p.id === uid)?.status !== 'P') return
        if (_.get(game, 'hand.currentPlayer') === uid) return 'YOUR_TURN'
        if (_.get(game, 'hand.currentPlayer')) return 'OTHERS_TURN'
    }

    const triggerAction = async (action, amount) => {
        if (!props.action || Date.now() - lastClickRef.current < 500) return
        lastClickRef.current = Date.now()
        await Promise.resolve(props.action(action, amount))
    }

    const renderByMode = () => {
        const mode = controlMode()

        if (mode === 'YOUR_TURN' && showRaise) return renderRaise()
        if (showRaise) setShowRaise(false)

        switch (mode) {
            case 'AWAY':
                return renderAway()
            case 'START_GAME':
                return renderStartGame()
            case 'OTHERS_TURN':
                return renderOtherTurn()
            case 'YOUR_TURN':
                return renderYourTurn()
            case 'SHOW_DOWN':
                return renderShowDown()
        }
        return null
    }

    const renderStartGame = () => {
        return (
            <>
                <GameControlButton color='red' onClick={Utils.confirmAction('Reveal game seed ?', 'This game will be permanently closed. This action cannot be undone!', () => triggerAction('REVEAL_SEED'))}>Reveal Game Seed</GameControlButton>
                <GameControlButton color='gray' onClick={() => triggerAction('SHUFFLE_SEAT')}>Shuffle seats</GameControlButton>
                <GameControlButton color='green' onClick={() => triggerAction('START_GAME')}>Start game</GameControlButton>
            </>
        )
    }

    const renderAway = () => {
        return (
            <>
                <GameControlButton color='green' onClick={() => triggerAction('I_AM_BACK')}>I am back</GameControlButton>
            </>
        )
    }

    const renderOtherTurn = () => {
        return (
            <>
                <GameControlButton
                    bindKey='73'
                    selected={settings.hand === game.hand?.id && settings.round === game.hand?.round && settings.autoAction === 'CHECK_OR_FOLD'}
                    disabled={isDisabled} color='white'
                    onClick={() => triggerAction('S_CHECK_OR_FOLD')}>
                        Check or fold
                </GameControlButton>
                <GameControlButton
                    bindKey='75'
                    selected={settings.hand === game.hand?.id && settings.round === game.hand?.round && settings.autoAction === 'CHECK'}
                    disabled={isDisabled} color='green'
                    onClick={() => triggerAction('S_CHECK')}>
                        Check
                </GameControlButton>
                <GameControlButton
                    bindKey='70'
                    selected={settings.hand === game.hand?.id && settings.round === game.hand?.round && settings.autoAction === 'FOLD'}
                    disabled={isDisabled} color='red'
                    onClick={() => triggerAction('S_FOLD')}>
                        Fold
                </GameControlButton>
            </>
        )
    }

    const renderYourTurn = () => {
        return (
            <>
                <GameControlButton bindKey={call > 0 ? '67' : '75'} color='green' disabled={isDisabled} onClick={() => triggerAction('BET', betting)}>{call > 0 ? `Call ${call}` : 'Check'}</GameControlButton>
                <GameControlButton bindKey='82' color='green' disabled={isDisabled} onClick={() => {
                    setRaiseAmount(minRaise)
                    setShowRaise(true)
                }}>Raise</GameControlButton>
                <GameControlButton bindKey='70' color='red' disabled={isDisabled} onClick={() => triggerAction('FOLD')}>Fold</GameControlButton>
            </>
        )
    }

    const renderShowDown = () => {
        return (
            <>
                {!player?.showCard && <GameControlButton bindKey='83'  color='green' disabled={isDisabled} onClick={() => triggerAction('SHOW_CARDS')}>Show cards</GameControlButton>}
            </>
        )
    }

    const renderRaise = () => {
        return (
            <>
                <div className='raiseControlContainer'>
                    <div className='yourBetContainer'>
                        <span>Your bet</span>
                        <input
                            id="yourBetInput"
                            className="yourBetInput"
                            pattern="[0-9]*"
                            type="number"
                            min="0"
                            step="1"
                            onChange={e => setRaiseAmount(e.target.value)}
                            value={raiseAmount}
                        >
                        </input>
                    </div>
                    <div className='quickBetContainer'>
                        <div id="quickRaise" className='quickBetRowContainer' style={{height: quickBets ? '40%' : '60%'}}>
                            {raises.map(r => (
                                <GameControlButton className="raiseButton" key={r.text} color='gray' disabled={isDisabled} onClick={() => setRaiseAmount(Math.max(r.value, minRaise))}>{r.text}</GameControlButton>
                            ))}
                        </div>
                        {quickBets && 
                        <div id="quickBet" className='quickBetRowContainer' style={{height: '40%'}}>
                            {quickBets.map(qb => (
                                <GameControlButton className="raiseButton" key={qb} color='gray' disabled={isDisabled} onClick={() => setRaiseAmount(qb)}>{qb}</GameControlButton>
                            ))}
                        </div>}
                    </div>
                </div>

                <GameControlButton bindKey='27' color='white' disabled={isDisabled} onClick={() => {
                    setRaiseAmount(0)
                    setShowRaise(false)
                    document.getElementById('main-container')?.focus()
                }}>BACK</GameControlButton>
                <GameControlButton bindKey='13' color='green' disabled={isDisabled} onClick={() => {
                    setShowRaise(false)
                    setRaiseAmount(0)
                    triggerAction('BET', parseInt(raiseAmount))
                    document.getElementById('main-container')?.focus()
                }}>BET</GameControlButton>
            </>
        )
    }

    return (
        <div className='gameControlContainer' {..._.pick(props, 'style')}>
            {renderByMode()}
        </div>
    )
}

export default GameControl;
