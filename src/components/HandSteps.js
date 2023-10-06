import { List } from 'antd';
import { GetPlayerName } from '../models/game';
import './HandsLog.css';

function HandSteps(props) {
    const { steps } = props

    if (!steps) return

    const getRound = (round) => {
        const roundName = () => {
            switch (round) {
                case 'PF':
                    return 'Pre-flop'
                case 'F':
                    return 'Flop'
                case 'T':
                    return 'Turn'
                case 'R':
                    return 'River'
                case 'D':
                    return 'Done'
            }
    
            return ''
        }

        return <span style={{fontWeight: 'bold'}}>{roundName()}</span>
    }

    const getCardDesc = (card) => {
        const getColor = (suit) => {
            if (suit === 'H' || suit === 'D') return '#db3131'
            return '#2c2c2c'
        }

        const rank = card.rank === 14 ? 'A' : card.rank === 13 ? 'K' : card.rank === 12 ? 'Q' : card.rank === 11 ? 'J' : card.rank
        const suit = card.suit === 'H' ? '♥' : card.suit === 'D' ? '♦' : card.suit === 'C' ? '♣' : '♠'
        return (<span style={{color: getColor(card.suit)}}>{rank}{suit} </span>)
    }

    const playerName = (pid) => {
        const name = GetPlayerName(pid)
        return (<span style={{fontWeight: 'bold', fontFamily: 'Mulish,sans-serif', color: '#FF8A80'}}>{name}</span>)
    }

    const getBetAction = (action, amount) => {
        if (action === 0) return 'checked'
        if (action === 1) return `called ${amount} chips`
        if (action === 2) return `raised to ${amount} chips`
        if (action === 2) return `alled in ${amount} chips`
        return `Bet ${amount} chips`
    }

    const getStepContent = (step) => {
        if (step.type === 0) {
            return (<span>Hand started</span>)
        }
        else if (step.type === 1) {
            return (<span>{getRound(step.round)} started. Dealt: {step.cards.map(c => getCardDesc(c))}</span>)
        }
        else if (step.type === 2) {
            return (<span>Player {playerName(step.player)} {getBetAction(step.betType, step.amount)}</span>)
        }
        else if (step.type === 3) {
            return (<span>Player {playerName(step.player)} folded</span>)
        }
        else if (step.type === 4) {
            return (<span>Hand ended</span>)
        }
        else if (step.type === 5) {
            return (<span>Player {playerName(step.player)} shown their cards: {step.cards.map(c => getCardDesc(c))}</span>)
        }

        return ''
    }

    return (
        <div style={{
            height: '70vh',
            overflow: 'auto'
        }}>
            <List
                dataSource={steps}
                renderItem={(step) => (
                    <List.Item>
                        {getStepContent(step)}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default HandSteps;