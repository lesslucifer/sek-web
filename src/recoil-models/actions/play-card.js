import { ActionHandler } from "./handler";

export class PlayCardActionHandler extends ActionHandler {
    get actionType() { return 'PLAY_CARD' }

    onAction(act, { setGamePlayer, setMe, uid }) {
        if (act.playerId === uid) {
          setMe(me => (me && {
            ...me,
            nCard: me.nCard - 1,
            cards: me.cards.filter(c => c !== act.card)
          }))
        }
  
        setGamePlayer(act.playerId, (p) => ({
          ...p,
          nCard: p.nCard - 1
        }))
    }
}