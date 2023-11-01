import { useCallback, useEffect, useRef } from "react"
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil"
import Utils from "./utils"
import { unstable_batchedUpdates } from "react-dom"

const refs = new Map()

export const useRefRecoilState = (recoilState) => {
    const key = recoilState.key
    const setState = useSetRecoilState(recoilState)

    const ref = refs.get(key) ?? { 
        current: undefined,
        dispatch(setStateAction) {
            ref.current = typeof setStateAction === "function" ? setStateAction(ref.current) : setStateAction
            setState(ref.current)
        }
    }

    useEffect(() => {
        if (!refs.has(key)) {
            refs.set(key, ref)
            setState(st => {
                ref.current = st
            })
        }
    }, [])

    return [Utils.wrapBy(() => ref.current), ref.dispatch, ref]
}