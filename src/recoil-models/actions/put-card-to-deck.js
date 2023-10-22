import { ActionHandler } from "./handler";

export class PutCardToDeckActionHandler extends ActionHandler {
    get actionType() { return 'PUT_CARD_TO_DECK' }

    onAction(act, { setGame }) {
        setGame(g => (g && {
            ...g,
            deck: {
                ...g.deck,
                nCard: act.deckCount
            }
        }))
    }
}