import { ActionHandler } from "./handler";

export class NewTurnActionHandler extends ActionHandler {
    get actionType() { return 'NEW_TURN' }

    onAction(act, { setGame }) {
        // setGame(g => (g && {
        //     ...g,
        //     currentPlayerId: act.playerId
        // }))
    }
}