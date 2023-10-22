import { ActionHandler } from "./handler";

export class NewEventActionHandler extends ActionHandler {
    get actionType() { return 'NEW_EVENT' }

    onAction(act, { setGame }) {
        setGame(g => (g && {
            ...g,
            event: act.event
        }))
    }
}