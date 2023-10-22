import { useCallback, useRef } from "react"
import { useRecoilState } from "recoil"

export const useRecoilStateRef = (recoilState) => {
    const [state, setState] = useRecoilState(recoilState)
    const ref = useRef(state)

    const dispatch = useCallback((setStateAction) => {
        ref.current = typeof setStateAction === "function" ? setStateAction(ref.current) : setStateAction
        setState(ref.current)
    }, [])

    return [state, dispatch, ref]
}