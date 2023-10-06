import { HistoryOutlined, ReadOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import GameLogs from '../components/GameLogs';
import HandsLog from '../components/HandsLog';
import usePortrait from '../hooks/usePortrait';
import './Logs.css';

function Logs(props) {
  const { game, http } = props
  const portrait = usePortrait()

  if (!game) return

  return (
    <>
      <div className={`logsContainer ${portrait ? 'port' : 'land'}`} >
        <Tabs defaultActiveKey="hands" items={[
          {
            key: 'hands',
            label: (<span><HistoryOutlined />Hands</span>),
            children: <HandsLog game={game} http={http} />
          },
          {
            key: 'gameLogs',
            label: (<span><ReadOutlined />Game Logs</span>),
            children: <GameLogs game={game} http={http} />
          }
        ]} />
      </div>
    </>
  );
}

export default Logs;
