export default class Storage {
    static getUserId() {
        return localStorage.getItem('x-player-id')
    }

    static getLastName() {
        return localStorage.getItem('last-name') ?? ''
    }

    static getToken() {
        return localStorage.getItem('access-token')
    }
    
    static getPreferences() {
        try {
            const data = localStorage.getItem('preferences')  
            const settings = JSON.parse(data)
            if (settings.quickBets.length !== 5 || settings.quickBets.findIndex(b => b < 0) >= 0 || settings.threshold < 0
                || isNaN(settings.volume)) throw new Error()
            return settings
        }
        catch (err) {
            const defaultSettings = {
                enableQuickBet: true,
                quickBets: [3, 4, 5, 10, 50],
                betThreshold: 100,
                darkFold: false,
                volume: 50
            }
            this.setPreferences(defaultSettings)
            return defaultSettings
        }
    }

    static setUserId(uid) {
        return localStorage.setItem('x-player-id', uid)
    }

    static setLastName(name) {
        return localStorage.setItem('last-name', name)
    }

    static setToken(token) {
        return localStorage.setItem('access-token', token)
    }

    static setPreferences(settings) {
        return localStorage.setItem('preferences', JSON.stringify(settings))
    }
}