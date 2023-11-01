import _, { memoize } from "lodash";
import { atom, constSelector, selector, useRecoilState } from "recoil";
import protob from '../proto/game.proto';

export const gameState = atom({
    key: `game`,
    default: null
})

export const deckState = atom({
    key: 'game.deck',
    default: null
})

export const dexState = atom({
    key: 'game.deck.dex',
    default: []
})

export const eventState = atom({
    key: 'game.event',
    default: null
})

export const gameTimeState = atom({
    key: 'game.time',
    default: Date.now()
})

export const onGame = ({ setGame, setDeck, setDex, setEvent, setGameTime }) => (data) => {
    const newGame = (data instanceof ArrayBuffer) ? protob.Game.decode(new Uint8Array(data)) : data
    setGame(newGame)
    setDeck(newGame.deck)
    setDex(newGame.deck?.dex ?? [])
    setEvent(newGame.event)
    setGameTime(newGame.time ?? Date.now())
}

export const setGamePlayer = (setGame) => (playerId, modifier) => {
    setGame(g => g && {
        ...g,
        players: g.players?.map(p => p.id === playerId ? modifier(p) : p)
    })
}