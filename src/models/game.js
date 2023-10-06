window.PlayersCache = {}
export const GetPlayerName = (id) => {
  return window.PlayersCache?.[id]?.name ?? 'Guest'
}

export const UpdatePlayerName = (game) => {
  Object.assign(window.PlayersCache, game?.players ?? {})
}

export const MASKED_CARD = { rank: 0, suit: 'H' }
export const NO_CARD = { rank: 15, suit: 'X'}