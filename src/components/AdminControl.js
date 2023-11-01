
import _ from 'lodash';
import { CloseSquareOutlined, PauseCircleOutlined, SolutionOutlined, ControlOutlined } from '@ant-design/icons';
import './AdminControl.css'
import { Button } from 'antd';

function AdminControl(props) {
    const stopGame = props?.stopGame
    const stopped = props?.stopped
    const pauseOrResume = props?.pauseOrResume

    const buttonIconStyles = {
        color: '#777777'
    }

    return (<div className={`c`} {..._.pick(props, 'style')} >
        <Button type="ghost" size="large" 
            icon={<SolutionOutlined style={buttonIconStyles}/>}
            onClick={props.managePlayer}
        />
        <Button type="ghost" size="large" 
            icon={<ControlOutlined style={buttonIconStyles}/>}
            onClick={props.openSettings}
        />
        {props.gameActive && <>
            <Button type="ghost" size="large"
                icon={<PauseCircleOutlined style={buttonIconStyles}/>}
                onClick={pauseOrResume}
            />
            <Button type="ghost" size="large" icon={<CloseSquareOutlined style={{
                color: stopped ? 'red' : '#777777'
            }} />} onClick={stopGame} />
        </>}
    </div>)
}

export default AdminControl;
