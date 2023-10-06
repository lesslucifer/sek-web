
import { OrderedListOutlined, UserDeleteOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import _ from 'lodash';
import './Menu.css';

function Menu(props) {
    const openLedger = props?.openLedger
    const openHistory = props?.openHistory
    const openPreferences = props?.openPreferences
    const leaveSeat = props?.leaveSeat
    const unLeaveSeat = props?.unLeaveSeat
    const away = props?.away

    const buttonIconStyles = {
        color: '#777777'
    }

    return (<div className="menuContainer" {..._.pick(props, 'style')} >
        <Button type="ghost" size="large" icon={<OrderedListOutlined style={buttonIconStyles} />} onClick={openLedger} />
        <Button type="ghost" size="large" icon={<HistoryOutlined style={buttonIconStyles} />} onClick={openHistory} />
        <Button type="ghost" size="large" icon={<SettingOutlined style={buttonIconStyles} />} onClick={openPreferences} />
        {away && <Button key="btnLeaveSeat" type="ghost" size="large"
            icon={<LogoutOutlined style={buttonIconStyles} />}
            onClick={away}
        />}
        {leaveSeat && <Button key="btnLeaveSeat" type="ghost" size="large"
            icon={<UserDeleteOutlined style={buttonIconStyles} />}
            onClick={leaveSeat}
        />}
        {unLeaveSeat && <Button key="btnLeaveSeat" type="ghost" size="large"
            icon={<UserDeleteOutlined style={{color: 'red'}} />}
            onClick={unLeaveSeat}
        />}
    </div>)
}

export default Menu;
