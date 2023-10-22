import { ActionHandler } from "./handler";

export class ChangeDirectionActionHandler extends ActionHandler {
  get actionType() { return 'CHANGE_DIRECTION' }

  onAction(act, { setGame }) {
    setGame(g => (g && {
      ...g,
      direction: act.index
    }))
  }
}