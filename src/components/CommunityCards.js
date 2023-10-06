
import _ from 'lodash';
import { useState, useEffect } from 'react'
import Card from './Card'
import './CommunityCards.css'

function CommunityCards(props) {
    const { modes } = props

    const [cards, setCards] = useState([])

    useEffect(() => {
        if (props.cards.length < cards.length) {
            setCards(props.cards)
            return
        }

        if (_.range(cards.length).find(i => cards[i].rank !== props.cards[i].rank || cards[i].suit !== props.cards[i].suit)) {
            setCards(props.cards)
            return
        }

        for (let i = cards.length; i < props.cards.length; ++i) {
            const newCard = props.cards[i]
            setTimeout(() => {
                setCards(cCards => {
                    if (cCards.find(c => c.rank === newCard.rank && c.suit === newCard.suit)) {
                        return cCards
                    }
                    return [...cCards, newCard]
                    
                })
            }, (i - cards.length) * 200);
        }
    }, [props.cards])

    const className = [
        'communityCardsContainer',
        props.className
    ].join(' ')

    return (<div className={className} {..._.pick(props, 'style')}>
        {cards.map((c, i) => c && (
            <div style={{ margin: '0.3rem' }} key={i}>
                <Card mode={_.get(modes, i)} card={c} />
            </div>
        ))}
    </div>)
}

export default CommunityCards;