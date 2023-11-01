import { atom, useRecoilState, selector } from "recoil";
import protob from '../proto/game.proto';

export const meState = atom({
    key: `me`,
    default: null
})

export const myCardsState = atom({
    key: `me.cards`,
    default: []
})

export const onMe = ({ game, room, setMe, setMyCards }) => (data) => {
    const newMe = data instanceof ArrayBuffer ? protob.GamePlayer.decode(new Uint8Array(data)) : data
    setMe(newMe)
    setMyCards(newMe.cards)
}