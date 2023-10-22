import { atom, useRecoilState, selector } from "recoil";
import protob from '../proto/game.proto';

export const meState = atom({
    key: `me`,
    default: null
})

export const onMe = ({ game, room, setMe }) => (data) => {
    const newMe = protob.GamePlayer.decode(new Uint8Array(data))
    console.log('Set me', game, room)
    setMe(newMe)
}