import { CrownOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import _ from 'lodash';
import usePortrait from '../hooks/usePortrait';
import './Ledger.css';

function Ledger(props) {
  const game = props.game
  const portrait = usePortrait()

  if (!game) return

  const columnsConfig = () => [
    {
      title: 'Name',
      key: 'name',
      render: (p) => {
        return <>
          <span className='playerInfo' style={{fontWeight: 'bold'}}>{p.name}</span>
          <span className='playerInfo' style={{color: 'gray'}}> ({p.id})</span>
          {p.id === game.ownerId && <span><CrownOutlined style={{color: 'red', fontSize: portrait ? 10 : 20}} /></span>}
        </>
      }
    },
    {
      title: 'Buy In',
      dataIndex: 'buyIn',
      key: 'buyIn'
    },
    ...(portrait ? [{
      title: 'Buy Out',
      render: p => p.buyOut + p.stack,
    }] : [{
      title: 'Buy Out',
      dataIndex: 'buyOut',
      key: 'buyOut',
    },
    {
      title: 'Stack',
      dataIndex: 'stack',
      key: 'stack',
    }]),
    {
      title: 'NET',
      key: 'net',
      render: (p) => {
        const value = p.buyOut + p.stack - p.buyIn
        return <span className={value >= 0 ? 'ledgerResultPos' : 'ledgerResultNeg'}>{value}</span>
      }
    }
  ]

  return (
    <>
      <div className={`ledgerContainer ${portrait ? 'port' : 'land'}`}>
        <Table
          dataSource={_.sortBy(_.values(game.players), p => -(p.buyOut + p.stack - p.buyIn))}
          rowKey={p => p.id}
          columns={columnsConfig()}
          pagination={{pageSize: portrait ? 4 : 6}}
        />
      </div>
    </>
  );
}

export default Ledger;
