import { Button, List, Modal, Table } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePortrait from '../hooks/usePortrait';
import useWindowSize from '../hooks/useWindowSize';
import { GetPlayerName } from '../models/game';
import Utils from '../utils/utils';
import Card from './Card';
import './HandsLog.css';
import HandSteps from './HandSteps';

function HandsLog(props) {
    const navigate = useNavigate()
    const { game, http } = props
    const [hands, setHands] = useState([])
    const [vw, vh] = useWindowSize()
    const [totalHands, setTotalHands] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const portrait = usePortrait()
    const pageSize = 4
    const scale = portrait ? vw / 1700 : vw / 2500
    const [viewingHand, setViewingHand] = useState(null)

    useEffect(() => {
        loadPage({ current: 1 })
    }, [])

    const columnsConfig = () => [
        ...(!portrait ? [{
            title: '#ID',
            key: 'id',
            render: h => h.id
        }] : []),
        {
            title: 'Your hand',
            key: 'yourCards',
            render: (h) => {
                return (<>
                    {h.yourCards ? (<div className='cardsContainer'>
                        {h.yourCards.map(c => <Card card={c} scale={scale} style={{ margin: `0 ${4 * scale}px` }} />)}
                    </div>) : <div className='cardsContainer'>
                        No cards
                    </div>}
                </>)
            }
        },
        {
            title: 'Community Cards',
            key: 'commCards',
            render: (h) => {
                return (
                    <div className='cardsContainer' style={{ justifyContent: 'flex-start' }}>
                        {!!h.communityCards.length && h.communityCards.map(c => <Card card={c} scale={scale} style={{ margin: `${10 * scale}px ${4 * scale}px` }} />)}
                        {!h.communityCards.length && <div>No Cards</div>}
                    </div>)
            }
        },
        ...(!portrait ? [{
            title: 'Winners',
            key: 'winners',
            render: (h) => (<List
                dataSource={_.sortBy(_.entries(h.winners).map(([pid, amount]) => ({ id: pid, amount })), p => -p.amount)}
                renderItem={(p) => (
                    <List.Item>
                        {GetPlayerName(p.id)}: {p.amount}
                    </List.Item>
                )}
            />),
            width: '15vw'
        }] : []),
        {
            title: 'Actions',
            key: 'actions',
            render: (h) => {
                return (<>
                    <Button type="link" href={`/hand/${game.id}/${h.id}`} target='_blank' size='small'>Replay</Button>
                    <Button type="link" size='small' onClick={() => openLogs(h.id)}>Logs</Button>
                </>)
            },
            width: '10vw'
        },
    ]

    const loadPage = Utils.autoError(async (page) => {
        if (isLoading) return

        try {
            setIsLoading(true)
            const url = `/game/hands?page=${page.current - 1}&pageSize=${pageSize}`
            const resp = await http.get(url)

            const hands = resp.data?.data?.data ?? []
            const total = resp.data?.data?.total ?? totalHands

            setHands(hands)
            setTotalHands(total)
        }
        finally {
            setIsLoading(false)
        }
    })

    const openLogs = Utils.autoError(async (handId) => {
        if (isLoading) return

        try {
            setIsLoading(true)
            const url = `/game/hands/${handId}`
            const resp = await http.get(url)
            const hand = resp.data?.data
            const steps = hand?.logs
            if (steps) {
                setViewingHand({
                    ...hand,
                    steps: steps?.flatMap(log => log.steps)
                })
            }
        }
        finally {
            setIsLoading(false)
        }
    })

    const viewDeck = Utils.autoError((hand) => {
        if (!game.seed) throw new Error(`Cannot view deck. The game seed is not revealed. Please request the game owner to reveal it`)
        window.open(`/deck?seed=${game.seed}&hand=${hand.id}&pot=${hand.lastPot}`)
    })

    if (!game) return

    return (
        <>
            <div className={`handsLogContainer ${portrait ? 'port' : 'land'}`}>
                <Table
                    dataSource={hands}
                    loading={isLoading}
                    rowKey={p => p.id}
                    columns={columnsConfig()}
                    pagination={{ pageSize, total: totalHands, defaultCurrent: 1, showSizeChanger: false }}
                    onChange={loadPage}
                />
            </div>
            <Modal title={<>
                <span style={{marginRight: 5}}>History</span>
                <Button style={{marginRight: 5}} type="primary" size="small" target='_blank' href={`/hand/${viewingHand?.gameId}/${viewingHand?.id}`}>Replay</Button>
                <Button type="primary" size="small" onClick={() => viewDeck(viewingHand)}>View Deck</Button>
                </>}
                centered
                open={!!viewingHand}
                onOk={() => setViewingHand(null)}
                onCancel={() => setViewingHand(null)}
                cancelButtonProps={{ style: { display: 'none' } }}
                closable={portrait}
            >
                <HandSteps steps={viewingHand?.steps}></HandSteps>
            </Modal>
        </>
    )
}

export default HandsLog;