import { ActionHandler } from "./handler";

export class StealActionHandler extends ActionHandler {
  get actionType() { return 'STEAL' }

  onAction(act, { setGamePlayer, setMe, uid }) {
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

    act.playerIds.map(pid => setGamePlayer(pid, (p) => ({
      ...p,
      nCard: p.nCard - 1
    })))
  }
}