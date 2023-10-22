import _, { memoize } from "lodash";
import { atom, constSelector, selector, useRecoilState } from "recoil";
import protob from '../proto/game.proto';

export const gameState = atom({
    key: `game`,
    default: null
})

export const onGame = ({ setGame }) => (data) => {
    const newGame = protob.Game.decode(new Uint8Array(data))
    console.log(`On game`, newGame, setGame)
    setGame(newGame)
}

// export const deckState = selector({
//     key: `game.deck`,
//     get: ({get}) => {
//         const game = get(gameState)
//         return game?.deck
//     },
//     set: ({get, set}, val) => {
//         const game = get(gameState)
//         set(gameState, game && {
//             ...game,
//             deck: val
//         })
//     }
// })

// export const cardDexState = selector({
//     key: `game.deck.dex`,
//     get: ({get}) => {
//         const game = get(gameState)
//         return game?.deck?.dex
//     }
// })

export const gamePlayerState = memoize((playerId) => selector({
    key: `game.players.${playerId}`,
    get: ({ get }) => {
        const game = get(gameState)
        return game.players.find(p => p.id === playerId)
    },
    set: ({ get, set }, val) => {
        const game = get(gameState)
        set(gameState, game && {
            ...game,
            players: game.players?.map(p => p.id === playerId ? val : p)
        })
    }
}))

export const setGamePlayer = (setGame) => (playerId, modifier) => {
    setGame(g => g && {
        ...g,
        players: g.players?.map(p => p.id === playerId ? modifier(p) : p)
    })
}

export const setDeck = (setGame) => (updator) => {
    setGame(g => g && {
        ...g,
        deck: _.isFunction(updator) ? updator(g.deck) : updator
    })
}