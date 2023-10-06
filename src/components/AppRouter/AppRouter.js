import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/Home';
import Game from '../../pages/Game';
import NotFound from '../../pages/404';
import HandReplayer from '../../pages/HandReplayer';
import Deck from '../../pages/Deck';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/game/:gameid" element={<Game />}/>
        <Route exact path="/hand/:gameId/:handId" element={<HandReplayer />}/>
        <Route exact path="/deck" element={<Deck />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default (AppRouter);
