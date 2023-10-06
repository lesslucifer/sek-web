
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import './TimeBar.css'

function TimeBar(props) {
    const [counter, setCounter] = useState(0)
    const [total, setTotal] = useState(1)
    const valRef = useRef(null)

    useEffect(() => {
        const initValue = props.current - props.begin
        const total = props.end - props.begin

        const beginTime = Date.now()
        const interval = setInterval(() => {
            const val = initValue + Date.now() - beginTime 
            const percentage = 100 - (total > 0 ? 100 * val / total : 0)
            
            if (valRef.current) valRef.current.style.width = `${percentage}%`
        }, 60)

        setCounter(initValue)
        setTotal(total)

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [props.begin, props.current, props.end])

    const percentage = 100 - (total > 0 ? 100 * counter / total : 0)

    return (total > 0 && <div className='timeBarContainer' {...props.barProps}>
        <div ref={valRef} id='timeBarValue' style={{width: `${percentage}%`}}></div>
    </div>)
}

export default TimeBar;