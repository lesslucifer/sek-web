import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newHTTP from '../api/http';
import Utils from '../utils/utils';
import './Home.css';

function HomePage() {
  const http = newHTTP('')
  const navigate = useNavigate()

  useEffect(() => {
    http.verifyUser()
  }, [])

  const createNewgame = Utils.autoError(async () => {
    const resp = await http.post('/games')
    const gameId = resp.data.data?.id
    if (!gameId) throw new Error(`Cannot create game. Server error! Please try again`)
    navigate(`/game/${gameId}`)
  })

  return (
    <>
      <div className="homeTable">
        <div className='homeMainContent'>
          <img className='homeLogo' src='logo512.png' />
          <div className='newGameButton' onClick={createNewgame}>New Game</div>
          <a href='https://gist.github.com/lesslucifer/980de74be894aec0d5e67e4f7a915c75' className='shuffleLink'>Why PokerAA is completely random ?</a>
        </div>
      </div>
    </>
  );
}

export default HomePage;