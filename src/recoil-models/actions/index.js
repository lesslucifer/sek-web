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

let Queue = undefined

export const onAction = (ctx, performAction) => { 
    const queue = new ExecutionQueue((act) => {
        const handler = handlerMap.get(act.type)
        handler?.onBeforeAction(act, ctx)
        const ret = performAction(act, ctx)
        return Promise.resolve(ret).then(() => handler?.onAction(act, ctx))
    })

    if (Queue) {
        Queue.clear()
        Queue = queue
    }

    return (data) => {
        const { time, actions } = protob.GameActionsMessage.decode(new Uint8Array(data))
        queue.add(...actions)
        ctx.setGameTime(time ?? Date.now())
    }
}

export const clearActionExecutionQueue = () => {
    Queue?.clear()
}