
import _ from 'lodash';
import styled, { keyframes } from 'styled-components'
import usePortrait from '../hooks/usePortrait';
import './Card.css';

const BackDiv = styled.div``

const flipAnimation = {
    from: {
        transform: "perspective(400px) rotate3d(0, 1, 0, 90deg)"
    },
    to: {
        transform: "perspective(400px)"
    }
}
const NormalDiv = styled.div`
    animation: 0.3s ${keyframes`${flipAnimation}`};
`

const highlightAnimation = {
    to: {
        'transform': "translate3d(0, -1rem, 0)",
        'background-color': '#f1f1f1',
        'border-color': '#404040',
        'border-width': '2px',
        'box-shadow': '#c4c4c4 0px 0px 2rem',
    }
}
const HighlightDiv = styled.div`
    animation: 0.3s ${keyframes`${highlightAnimation}`} forwards;
`

const downAnimation = {
    to: {
        'background-color': '#b8b8b8',
        'border-color': '#6d6d6d'
    }
}
const DownDiv = styled.div`
    animation: 0.3s ${keyframes`${downAnimation}`} forwards;
`

function getContainerComponent(mode) {
    if (mode === 'highlight') return HighlightDiv
    if (mode === 'down') return DownDiv
    return NormalDiv
}

function Card(props) {
    const { card } = props
    const ContainerComponent = getContainerComponent(props.mode)
    const potrait = usePortrait();

    const { rank, suit} = card ?? {}

    if (rank <= 1) return (<BackDiv className={`card cardBack ${props.mode}`} />)

    const getRank = () => {
        if (rank <= 10) return rank
        if (rank === 11) return 'J'
        if (rank === 12) return 'Q'
        if (rank === 13) return 'K'
        if (rank === 14) return 'A'
        return 'Ø'
    }

    const getSuit = () => {
        if (suit === 'H') return "\uF040"
        if (suit === 'D') return "\uF14A"
        if (suit === 'C') return "\uF0C7"
        if (suit === 'S') return "\uF04B"
        return 'Ø'
    }

    const getColor = () => {
        if (suit === 'H' || suit === 'D') return '#db3131'
        return '#2c2c2c'
    }

    const scale = props.scale ?? 1
    const width = 100 * scale;
    const height = 120 * scale;
    const borderRadius = 10 * scale;

    const rankFontSize = (potrait ? 2.2 : 2.5) * scale
    const suitFontSize = 2.7 * scale

    if (!card) return null

    return (<ContainerComponent className={`card ${props.mode}`} style={{color: getColor(), width: `${width}px`, height: `${height}px`, borderRadius: `${borderRadius}px`, ...(props.style ?? {})}}>
        <div className='cardContent' style={{width: `${width}px`, height: `${height}px`}}>
            <span className="cardRank" style={{fontSize: `${rankFontSize}rem`}}>{getRank()}</span>
            <span className="cardSuit" style={{fontSize: `${suitFontSize}rem`}}>{getSuit()}</span>
        </div>
    </ContainerComponent>)
}

export default Card;
