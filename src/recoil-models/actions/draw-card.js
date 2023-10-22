import { ActionHandler } from "./handler";

export class DrawCardHandler extends ActionHandler {
    get actionType() { return 'DRAW_CARD' }

    onAction(act, { setMe, setGamePlayer, uid, setDeck }) {
        if (act.playerId === uid) {
          setMe((prev) => ({
            ...prev,
            nCard: prev.nCard + 1,
            cards: [...prev.cards, act.card]
          }))
        }
  
        setGamePlayer(act.playerId, (p) => ({
          ...p,
          nCard: p.nCard + 1
        }))
        setDeck(deck => ({
          ...deck,
          nCard: act.deckCount
        }))
    }
}