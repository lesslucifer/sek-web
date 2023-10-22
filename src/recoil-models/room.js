import { atom, useRecoilState } from "recoil";
import protob from '../proto/game.proto';

export const roomState = atom({
    key: `room`,
    default: null
})

export const onRoom = ({ setRoom }) => (data) => {
    const newRoom = protob.Room.decode(new Uint8Array(data))
    console.log(`ON_ROOM`, newRoom)
    setRoom(newRoom)
}