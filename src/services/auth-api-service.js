import config from '../config'
import TokenService from '../services/token-service'

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })
            .then(res =>
                (!res.ok) ?
                res.json().then(e => Promise.reject(e)) :
                res.json()
            )
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(res =>
                (!res.ok) ?
                res.json().then(e => Promise.reject(e)) :
                res.json()
            )
    },
    postRefresh() {
        const authToken = TokenService.getAuthToken()
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${authToken}`
                }
            })
            .then(res =>
                (!res.ok) ?
                res.json().then(e => Promise.reject(e)) :
                res.json()
            )
            .then(data => {
                console.log(`refresh data: ${data}`)
                TokenService.saveAuthToken(data.authToken)
            })
    }
}

export default AuthApiService