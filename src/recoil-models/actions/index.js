import protob from '../../proto/game.proto';
import { ChangeDirectionActionHandler } from './change-direction';
import { DrawCardHandler } from './draw-card';
import { GameErrorActionHandler } from './game-error';
import { GameOverActionHandler } from './game-over';
import { NewEventActionHandler } from './new-event';
import { NewTurnActionHandler } from './new-turn';
import { PlayCardActionHandler } from './play-card';
import { PlayerLostActionHandler } from './player-lost';
import { PutCardToDeckActionHandler } from './put-card-to-deck';
import { ExecutionQueue } from './queue';
import { StealActionHandler } from './steal';

const handlers = [
    new ChangeDirectionActionHandler(),
    new DrawCardHandler(),
    new GameErrorActionHandler(),
    new GameOverActionHandler(),
    new NewEventActionHandler(),
    new NewTurnActionHandler(),
    new PlayCardActionHandler(),
    new PlayerLostActionHandler(),
    new PutCardToDeckActionHandler(),
    new StealActionHandler()
]

const handlerMap = new Map(handlers.map(h => [h.actionType, h]))

export const onAction = (ctx, performAction) => { 
    const queue = new ExecutionQueue((act) => {
        const handler = handlerMap.get(act.type)
        console.log(`Execute action`, handler, act)
        handler?.onBeforeAction(act, ctx)
        const ret = performAction(act, ctx)
        return Promise.resolve(ret).then(() => handler?.onAction(act, ctx))
    })

    return (data) => {
        const actions = data.map(d => protob.GameLog.decode(new Uint8Array(d)))
        queue.add(...actions)
    }
}