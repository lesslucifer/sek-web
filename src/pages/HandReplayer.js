import { Button, Pagination } from 'antd';
import _ from 'lodash';
import { util } from 'protobufjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import newHTTP from '../api/http';
import MainGame from '../components/MainGame';
import usePortrait from '../hooks/usePortrait';
import protob from '../proto/game.proto';
import Utils from '../utils/utils';
import './HandReplayer.css';

function HandReplayer() {
  const portrait = usePortrait()
  const navigate = useNavigate()
  const { gameId, handId } = useParams()
  const http = newHTTP(gameId)

  const [handData, setHandData] = useState(null)
  const [game, setGame] = useState(null)
  const [uid, setUid] = useState(null)
  const [myCards, setMyCards] = useState(null)

  useEffect(Utils.noReturn(Utils.autoError(() => {
    http.verifyUser().then(uid => {
      setUid(uid)
    })
  })), [])

  useEffect(Utils.noReturn(Utils.autoError(() => {
    if (!uid) return
    if (!game) loadHand().catch((err) => { // TODO: Load the hand data
      console.log(err)
      Swal.fire('Error', 'Cannot load hand. Hand not found!', 'error').then(() => {
        navigate('/')
      })
    })
  })), [uid])

  const loadHand = async () => {
    const resp = await http.get(`/room/hands/${handId}`)
    const hand = resp.data?.data
    if (!hand) throw new Error(`Cannot load hand`)
    console.log('loadHand', hand)
    setGame({
      id: gameId,
      status: 'PLAYING',
      seats: hand.seats,
      players: _.fromPairs(_.entries(hand.playerNames).map(([pid, name]) => [pid, {id: pid, name}])),
      onlinePlayers: _.keys(hand.playerNames),
      dealerSeat: hand.dealerSeat,
      requests: {
        seatIn: {},
        seatOut: []
      },
      time: Date.now(),
      hand: null
    })
    setMyCards({ hand: hand.id, cards: hand.yourCards })
    setHandData(hand)
    displayAtIndex(hand, 0)
  }

  const displayAtIndex = (handData, index) => {
    if (index >= handData.logs.length) throw new Error(`Cannot play at index ${index}; Out of bound`)
    const base64Data = handData.logs[index].data
    const buffer = new Uint8Array(util.base64.length(base64Data))
    util.base64.decode(base64Data, buffer, 0)
    const hand = protob.GameHand.decode(buffer)
    hand.playerCards = handData.playerCards
    setGame(game => ({...game, hand}))
  }

  const renderItem = (page, type, originalElement) => {
    if (type === 'jump-prev' || type === 'jump-next') return <div style={{color: 'white'}}>...</div>
    if (type === 'prev') return <Button ghost className="key-37">←</Button>
    if (type === 'next') return <Button ghost className="key-39">→</Button>
    if (type === 'page') return <Button ghost>{page}</Button>
    return originalElement
  }

  if (!game || !handData || !uid) return <MainGame game={game} uid={uid} /> // TODO

  return (
    <>
      <MainGame
        game={game}
        uid={uid}
        myCards={myCards.cards}
        isOnline={true}
      >
        <div className='paginationContainer'>
          <Pagination defaultCurrent={1} pageSize={1} total={handData.logs.length}
            itemRender={renderItem}
            responsive={true}
            showLessItems={portrait}
            onChange={(page) => displayAtIndex(handData, page - 1)} />
        </div>
      </MainGame>
    </>
  );
}

export default HandReplayer;
