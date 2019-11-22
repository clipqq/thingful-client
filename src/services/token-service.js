import config from '../config'
import AuthApiService from '../services/auth-api-service'

let _refreshTimeoutId;
let _idleTimeoutId;

document.addEventListener('mousemove', function(event) {
  console.log(`mouse moved`)
  // cancel old idle timeout
  clearTimeout(_idleTimeoutId)
  // start a new one
  _idleTimeoutId = setTimeout(function() {
    clearTimeout(_refreshTimeoutId)
  }, 50 * 1000)
}, true)

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