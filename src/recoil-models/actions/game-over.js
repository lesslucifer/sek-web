import { ActionHandler } from "./handler";

export class GameOverActionHandler extends ActionHandler {
  get actionType() { return 'GAME_OVER' }

  onAction(act, { setGame }) {
    setGame(g => (g && {
      ...g,
      status: 'O'
    }))
  }
}