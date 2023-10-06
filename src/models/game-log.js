import _ from 'lodash'
import { Button } from 'antd'
import { GetPlayerName } from './game'
import Utils from '../utils/utils'

export const GameLogActions = {
    GAME_INIT: 'GI',
    REQUEST_SEAT_IN: 'RS_I',
    REQUEST_SEAT_OUT: 'RS_O',
    REQUEST_UNSEAT_OUT: 'RS_UO',
    SEAT_IN: 'SI',
    SEAT_OUT: 'SO',
    REQUEST_STACK_ADD: 'RST_A',
    REQUEST_STACK_SET: 'RST_S',
    STACK_ADD: 'ST_A',
    STACK_SET: 'ST_S',
    NEW_HAND: 'NH',
    GAME_STOP: 'GS',
    HAND_OVER: 'HO',
    REQUEST_UPDATE_SETTINGS: 'RUS',
    UPDATE_SETTINGS: 'US',
    TRANSFER_OWNERSHIP: 'TO',
    SHUFFLE_SEATS: 'SHS',
    START_GAME: 'STRG',
    REQUEST_STOP_GAME: 'RSTPG',
    REQUEST_UNSTOP_GAME: 'RUSTPG',
    PAUSE_GAME: 'PSG',
    RESUME_GAME: 'RSG',
    SOCKET_IN: 'SK_I',
    SOCKET_OUT: 'SK_O',
    ERROR: 'ERR',
    REVEAL_SEED: 'RSD'
}

export const getLogConfig = (log, gameId, openLogs) => {
    switch (log.action) {
        case GameLogActions.GAME_INIT:
            return {
                title: 'Game initialized',
                content: ''
            }
        case GameLogActions.REQUEST_SEAT_IN:
            return {
                title: 'Seat requested',
                content: `Player ${GetPlayerName(log.player)} requested seat ${log.seat + 1}`,
                alt: Utils.objDescription(_.pick(log, 'buyIn', 'buyOut', 'stack', 'name'))
            }
        case GameLogActions.REQUEST_SEAT_OUT:
            return {
                title: 'Leave seat requested',
                content: `Player ${GetPlayerName(log.player)} requested to leave the seat ${log.seat + 1}`,
            }
        case GameLogActions.REQUEST_UNSEAT_OUT:
            return {
                title: 'Request leave seat cancelled',
                content: `Player ${GetPlayerName(log.player)} cancelled the request to leave the seat ${log.seat + 1}`,
            }
        case GameLogActions.SEAT_IN:
            return {
                title: 'Seat taken',
                content: `Player ${GetPlayerName(log.player)} took the seat ${log.seat + 1}`,
            }
        case GameLogActions.SEAT_OUT:
            return {
                title: 'Seat left',
                content: `Player ${GetPlayerName(log.player)} left seat ${log.seat + 1}`,
                alt: Utils.objDescription(_.pick(log, 'buyOut', 'stack'))
            }
        case GameLogActions.REQUEST_STACK_ADD:
            return {
                title: 'Add stack requested',
                content: `Admin requested to add ${log.amount} chips to player ${GetPlayerName(log.player)}`,
            }
        case GameLogActions.REQUEST_STACK_SET:
            return {
                title: 'Set stack requested',
                content: `Admin requested to set the stack of player ${GetPlayerName(log.player)} to ${log.amount}`,
            }
        case GameLogActions.STACK_ADD:
            return {
                title: 'Stack added',
                content: `Player ${GetPlayerName(log.player)}'s stack was added ${log.amount} chips (${log.stack - log.amount} -> ${log.stack})`,
                alt: Utils.objDescription(_.pick(log, 'buyIn', 'buyOut', 'stack'))
            }
        case GameLogActions.STACK_SET:
            return {
                title: 'Stack set',
                content: `Player ${GetPlayerName(log.player)}'s stack was set to ${log.amount} chips`,
                alt: Utils.objDescription(_.pick(log, 'buyIn', 'buyOut', 'stack'))
            }
        case GameLogActions.NEW_HAND:
            return {
                title: 'New hand',
                content: (<><span>Hand {log.handId} started.</span><Button type="link" size="small" onClick={() => openLogs?.(log.handId)}>Review</Button></>)
            }
        case GameLogActions.GAME_STOP:
            return {
                title: 'Game stopped',
                content: ''
            }
        case GameLogActions.HAND_OVER:
            return {
                title: 'Hand ended',
                content: (<><span>Hand {log.handId} ended.</span><Button type="link" size="small" onClick={() => openLogs?.(log.handId)}>Review</Button></>)
            }
        case GameLogActions.REQUEST_UPDATE_SETTINGS:
            return {
                title: 'Update settings requested',
                content: '',
                alt: Utils.objDescription(log.settings)
            }
        case GameLogActions.UPDATE_SETTINGS:
            return {
                title: 'Game settings updated',
                content: '',
                alt: Utils.objDescription(log.settings)
            }
        case GameLogActions.TRANSFER_OWNERSHIP:
            return {
                title: 'Game ownership transfered',
                content: `${GetPlayerName(log.owner)} transfered game ownership to ${GetPlayerName(log.player)}`,
            }
        case GameLogActions.SHUFFLE_SEATS:
            return {
                title: 'Shuffled seats',
                content: `Admin shuffled seats`,
                alt: Utils.objDescription(log.seats)
            }
        case GameLogActions.START_GAME:
            return {
                title: 'Game started',
                content: ``,
            }
        case GameLogActions.REQUEST_STOP_GAME:
            return {
                title: 'Game stop requested',
                content: `Game owner requested to stop the game`,
            }
        case GameLogActions.REQUEST_UNSTOP_GAME:
            return {
                title: 'Game stop request cancelled',
                content: `Game owner cancelled the request to stop the game`,
            }
        case GameLogActions.PAUSE_GAME:
            return {
                title: 'Game paused',
                content: `Game owner paused the game`,
            }
        case GameLogActions.RESUME_GAME:
            return {
                title: 'Game resumed',
                content: `Game owner resumed the game`,
            }
        case GameLogActions.ERROR:
            return {
                title: 'Error',
                content: log.message
            }
        case GameLogActions.REVEAL_SEED:
            return {
                title: 'Reveal game seed',
                content: `${GetPlayerName(log.owner)} has revealed the private seed! The game is now closed!`,
            }
        default:
            return {
                title: 'Unknown',
                content: JSON.stringify(log)
            }
    }
}