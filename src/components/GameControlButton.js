
import React from 'react'

import _ from 'lodash';
import './GameControlButton.css'

function GameControlButton(props) {
    const classNames = [
        'gameControlButton',
        props.disabled ? 'disabled' : '',
        props.selected ? 'selected' : '',
        props.color ?? '',
        props.className ?? '',
        props.bindKey ? `key-${props.bindKey}` : ''
    ].join(' ')

    const keyFromCharCode = (code) => {
        if (code === '13') return 'Enter'
        if (code === '27') return 'Esc'
        return String.fromCharCode(code)
    }

    return (<>
        <div className={classNames} onClick={() => !props.disabled && props.onClick?.()} {..._.pick(props, 'style')}>
            {props.bindKey && <span className='bindKey'>{keyFromCharCode(props.bindKey)}</span>}
            <span className='unselectable'>{props.children}</span>
        </div>
    </>)
}

export default GameControlButton;