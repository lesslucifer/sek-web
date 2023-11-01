import { Divider, List, Skeleton, Tooltip, Modal, Button } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getLogConfig } from '../models/game-log';
import HandSteps from './HandSteps';
import Utils from '../utils/utils';
import './GameLogs.css';

function GameLogs(props) {
    const { game, http } = props
    const [logs, setLogs] = useState([])
    const lastIdRef = useRef('')
    const isLoadingRef = useRef(false)
    const [viewingHand, setViewingHand] = useState(null)

    useEffect(() => {
        loadMore()
    }, [])

    const loadMore = Utils.autoError(async () => {
        if (isLoadingRef.current || lastIdRef.current === undefined) return

        try {
            isLoadingRef.current = true
            const url = lastIdRef.current ? `/room/logs?from=${lastIdRef.current}` : '/room/logs'
            const resp = await http.get(url)
            if (resp.data?.data?.logs?.length > 0) {
                setLogs(logs => [...logs, ...resp.data.data.logs])
                lastIdRef.current = resp.data.data.lastId
            }
            else {
                setLogs(logs => [...logs])
                lastIdRef.current = undefined
            }
        }
        finally {
            isLoadingRef.current = false
        }
    })

    const renderLogItem = (log) => {
        const config = getLogConfig(log, game.id, openLogs)
        return (<>
            <List.Item.Meta
                title={config.title}
                description={moment(log.time).format('YY-MM-DD HH:mm:ss.SS')}
            />
            {!config.alt ?
                <div className="gameLogContent">{config.content}</div> :
                <Tooltip placement="bottomRight" title={config.alt}>
                    <div className="gameLogContent">{config.content}</div>
                </Tooltip>
            }
        </>)
    }

    const openLogs = Utils.autoError(async (handId) => {
        if (isLoadingRef.current) return

        try {
            isLoadingRef.current = true
            const url = `/room/hands/${handId}`
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
            isLoadingRef.current = false
        }
    })

    if (!game.id) return

    return (<>
        <div id="gameLogsContainer">
            <InfiniteScroll
                dataLength={logs.length}
                next={loadMore}
                hasMore={lastIdRef.current !== undefined}
                loader={<Skeleton paragraph={{ rows: 0, width: 100 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="gameLogsContainer"
                height={400}
            >
                <List
                    dataSource={logs}
                    renderItem={(log, idx) => (
                        <List.Item key={idx}>
                            {renderLogItem(log)}
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
        <Modal title={<><span>History</span> <Button type="primary" size="small" target='_blank' href={`/hand/${viewingHand?.gameId}/${viewingHand?.id}`}>Replay</Button></>}
            centered
            open={!!viewingHand}
            onOk={() => setViewingHand(null)}
            onCancel={() => setViewingHand(null)}
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={true}
        >
            <HandSteps steps={viewingHand?.steps}></HandSteps>
        </Modal>
    </>)
}

export default GameLogs;