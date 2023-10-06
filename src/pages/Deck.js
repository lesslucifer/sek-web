import { Input } from 'antd';
import * as sha256 from 'crypto-js/sha256';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import usePortrait from '../hooks/usePortrait';
import useWindowSize from '../hooks/useWindowSize';
import { MersenneTwister19937, shuffle } from '../utils/random-js.min.js';
import './Deck.css';

const CardSuit = ['H', 'D', 'C', 'S']
export const BASE_CARDS = _.chain(_.range(2, 15)).flatMap(r => _.values(CardSuit).map(s => ({rank: r, suit: s}))).value()

function DeckPage() {
  const [query] = useSearchParams()
  const params = Object.fromEntries(query.entries())
  const [seed, setSeed] = useState(params.seed ?? '')
  const [handId, setHandId] = useState(params.hand ?? '')
  const [previousPot, setPreviousPot] = useState(params.pot ?? '')
  const [hash, setHash] = useState()
  const [cards, setCards] = useState([...BASE_CARDS])

  const [vw, vh] = useWindowSize()
  const portrait = usePortrait()
  const scale = portrait ? vw / 1200 : vw / 2500

  useEffect(() => {
    const nonce = [seed, handId, previousPot].join('')
    setHash(sha256(nonce))
  }, [seed, handId, previousPot])

  useEffect(() => {
    if (!hash) {
      setCards([])
      return
    }

    const randomizer = MersenneTwister19937.seedWithArray(hash.words)
    setCards(shuffle(randomizer, [...BASE_CARDS]))
  }, [hash])

  return (
    <>
      <div className="deckContainer">
        <a href='https://gist.github.com/lesslucifer/980de74be894aec0d5e67e4f7a915c75'>How PokerAA Shuffle Decks</a>
        <div className='seedContainer'>
          <Input className='seedInput' value={seed} onChange={(value) => setSeed(value.target.value)} addonBefore='Seed' />
          <Input className='seedInput' value={handId} onChange={(value) => setHandId(value.target.value)} addonBefore='Hand Id' />
          <Input className='seedInput' value={previousPot} onChange={(value) => setPreviousPot(value.target.value)} addonBefore='Previous Pot' />
        </div>
        <div className='seedContainer'>
          <Input className='seedInput' style={{width: '80vw'}} value={hash?.toString()} addonBefore='Hash' />
        </div>
        <div className={`cardsContainer ${portrait ? 'port' : 'land'}`}>
          {cards.map((c, i) => <Card key={i} card={c} scale={scale} style={{ margin: `${20 * scale}px ${10 * scale}px` }} />)}
        </div>
      </div>
    </>
  );
}

export default DeckPage;