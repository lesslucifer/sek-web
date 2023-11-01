import { ActionHandler } from "./handler";

export class DrawCardHandler extends ActionHandler {
    get actionType() { return 'DRAW_CARD' }

    onAction(act, { setMe, setGamePlayer, uid, setDeck, setMyCards }) {
        if (act.playerId === uid) {
          setMyCards((cards) => [...cards, act.card])
        }
  
        // setGamePlayer(act.playerId, (p) => ({
        //   ...p,
        //   nCard: p.nCard + 1
        // }))
        // setDeck(deck => ({
        //   ...deck,
        //   nCard: act.deckCount
        // }))
    }
}