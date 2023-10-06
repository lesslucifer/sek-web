import { CrownOutlined, UserDeleteOutlined, DeleteOutlined, UserSwitchOutlined, DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, notification, Table, InputNumber, Tabs } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import usePortait from '../hooks/usePortrait'
import Swal from 'sweetalert2';
import Utils from '../utils/utils';
import './PlayerManager.css';

function PlayerManager(props) {
  const portrait = usePortait()
  const { game, sendRequest } = props

  const [stackUpdateAmount, setStackUpdateAmount] = useState({})

  if (!game) return

  const stackColumnsConfig = (requestStackUpdate) => [
    {
      title: 'Name',
      key: 'name',
      render: (p) => {
        const req = game.requests.stack[p.id]
        return <div style={portrait ? {display: 'flex', flexDirection: 'column'} : {}}>
          <span className='playerInfo' style={{fontWeight: 'bold'}}>{p.name}</span>
          <span className='playerInfo' style={{color: 'gray'}}> ({p.id}) </span>
          {p.id === game.ownerId && <span><CrownOutlined style={{color: 'red', fontSize: portrait ? 10 : 20}} /></span>}
          {portrait && req && <span className='playerInfo'> (<DeleteOutlined onClick={() => requestStackUpdate(p, 'ADD', 0)} /> Will be {req.mode === "ADD" ? 'added' : 'set to'}: {req.amount})</span>}
        </div>
      }
    },
    ...(!portrait ? [{
      title: 'Stack',
      key: 'stack',
      tab: 'none',
      render: (p) => {
        const req = game.requests.stack[p.id]
        return (<>
          <span>{p.stack}</span>
          {req && <span className='playerInfo'> (<DeleteOutlined onClick={() => requestStackUpdate(p, 'ADD', 0)} /> Will be {req.mode === "ADD" ? 'added' : 'set to'}: {req.amount})</span>}
        </>)
      }
    }] : []),
    {
      title: 'Update Stack',
      key: 'updateStack',
      tab: 'stack',
      render: (p) => {
        return (<div className='updateStackContainer'>
          <InputNumber value={stackUpdateAmount[p.id] ?? 0} onChange={(value) => setStackUpdateAmount({...stackUpdateAmount, [p.id]: parseInt(value) || 0})} />
          <Button type="primary" size={portrait ? 'small' : 'medium'} onClick={() => requestStackUpdate(p, 'ADD')}>+ Add</Button>
          <Button type="primary" size={portrait ? 'small' : 'medium'} disabled={(stackUpdateAmount[p.id] ?? 0) <= 0} onClick={() => requestStackUpdate(p, 'SET')}>Set</Button>
        </div>)
      }
    }
  ]

  const actionColumnsConfig = (kickPlayer, transferOwnership) => [
    {
      title: 'Name',
      key: 'name',
      render: (p) => {
        return <div style={portrait ? {display: 'flex', flexDirection: 'column'} : {}}>
          <span className='playerInfo' style={{fontWeight: 'bold'}}>{p.name}</span>
          <span className='playerInfo' style={{color: 'gray'}}> ({p.id}) </span>
          {p.id === game.ownerId && <span><CrownOutlined style={{color: 'red', fontSize: portrait ? 10 : 20}} /></span>}
        </div>
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      tab: 'action',
      render: (p) => {
        return (<div className='playerManagerActionContainer'>
          <Button danger type="dashed" size='medium' icon={p.status === 'AWAY' ? <UserDeleteOutlined /> : <LogoutOutlined />} disabled={!game.seats.includes(p.id) || game.requests.seatOut.includes(game.seats.indexOf(p.id))} onClick={() => kickPlayer(p)}>{p.status === 'AWAY' ? 'Kick' : 'Away'}</Button>
          <Button danger type="primary" size='medium' icon={<CrownOutlined />} disabled={game.ownerId === p.id} onClick={() => transferOwnership(p)}>Owner</Button>
        </div>)
      }
    }
  ]

  const kickPlayer = Utils.autoError(async (p) => {
    if (p.status === 'AWAY') {
      sendRequest('KICK_PLAYER', {
        player: p.id
      })
      notification.success({
        message: 'Success',
        description: `Remove ${p.name} successfully`
      })
    }
    else {
      sendRequest('SET_PLAYER_STATUS', {
        player: p.id,
        status: 'AWAY'
      })
      notification.success({
        message: 'Success',
        description: `Set ${p.name} to away successfully`
      })
    }
  })

  const transferOwnership = Utils.autoError(async (p) => {
    const res = await Swal.fire({
      title: 'Are you sure ?',
      text: `Transfer game ownership to player ${p.name}! This action cannot be undone!!`,
      showCancelButton: true
    })
    if (!res.isConfirmed) return
  
    sendRequest('TRANSFER_OWNERSHIP', { newOwner: p.id })
    notification.success({
      message: 'Success',
      description: `Game ownership transfered`
    })

    props?.close()
  })

  const requestStackUpdate = Utils.autoError(async (p, mode, amount) => {
    sendRequest('UPDATE_STACK', { player: p.id, mode, amount: amount ?? stackUpdateAmount[p.id] ?? 0 })
  })

  const renderTable = (columns) => {
    return <Table
      dataSource={_.sortBy(_.values(game.players), p => p.name)}
      rowKey={p => p.id}
      columns={columns}
      pagination={{pageSize: portrait ? 4 : 6}}
    />
  }

  return (
    <>
      <div className={`playerManagerContainer ${portrait ? 'port' : 'land'}`} >
        <Tabs defaultActiveKey="stack" items={[
            {
              key: 'stack',
              label: (<span><DollarOutlined />Player Stack</span>),
              children: renderTable(stackColumnsConfig(requestStackUpdate))
            },
            {
              key: 'action',
              label: (<span><UserSwitchOutlined />Actions</span>),
              children: renderTable(actionColumnsConfig(kickPlayer, transferOwnership))
            }
          ]}/>
      </div>
    </>
  );
}

export default PlayerManager;
