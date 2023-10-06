
function processEnv(env) {
    return (window && window.__RUNTIME_CONFIG__ && window.__RUNTIME_CONFIG__[env]) || process.env[env]
}

export const API_URL = processEnv('API_URL');
export const SOCKET_URL = processEnv('SOCKET_URL');