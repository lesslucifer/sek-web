import { useCallback, useRef } from "react"
import { useRecoilState } from "recoil"
import Utils from "./utils"

export const useRefRecoilState = (recoilState) => {
    const [state, setState] = useRecoilState(recoilState)
    const ref = useRef(state)

    const dispatch = useCallback((setStateAction) => {
        ref.current = typeof setStateAction === "function" ? setStateAction(ref.current) : setStateAction
        console.log(`Set value for`, recoilState, ref.current)
        setState(ref.current)
    }, [])

    return [Utils.wrapBy(() => ref.current), dispatch]
}