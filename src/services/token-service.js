import config from '../config'
import AuthApiService from '../services/auth-api-service'

let _refreshTimeoutId;

const TokenService = {
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
    _refreshTimeoutId = setTimeout(function () {
      AuthApiService.postRefresh()
    }, 15 * 1000)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
    setTimeout(function () {
      /* remove the refresh timeout from the queue */
      clearTimeout(_refreshTimeoutId)
      /* logout */
      TokenService.clearToken()
    }, 50 * 1000)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService