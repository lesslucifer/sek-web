import { atom, useRecoilState } from "recoil";
import protob from '../proto/game.proto';

export const roomState = atom({
    key: `room`,
    default: null
})

export const onRoom = ({ setRoom }) => (data) => {
    const newRoom = data instanceof ArrayBuffer ? protob.Room.decode(new Uint8Array(data)) : data
    setRoom(newRoom)
}