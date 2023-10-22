import { ActionHandler } from "./handler";

export class PlayerLostActionHandler extends ActionHandler {
    get actionType() { return 'PLAYER_LOST' }

    onAction(act, { setGamePlayer, setMe, setGame, uid }) {
      if (act.playerId === uid) {
        setMe((prev) => ({
          ...prev,
          status: 'LOST',
          nCard: 0,
          cards: []
        }))
      }

      setGamePlayer(act.playerId, (p) => ({
        ...p,
        nCard: 0, 
        status: 'LOST',
        cards: []
      }))

      setGame(g => (g && {
        ...g,
        graveyard: [...g.graveyard, ...act.cards]
      }))
    }
}