import { ActionHandler } from "./handler";

export class GameErrorActionHandler extends ActionHandler {
  get actionType() { return 'GAME_ERROR' }

  onAction(act, { setGame }) {
    setGame(g => (g && {
      ...g,
      status: 'O'
    }))
  }
}