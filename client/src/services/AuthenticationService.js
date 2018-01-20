import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('user/register', credentials)
  },
  home (config) {
    return Api().get('/', config)
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  },
  user: {
    authenticated: false
  },
  config: {
    headers: {
      authToken: null
    }
  },
  checkAuth () {
    var jwt = localStorage.getItem('authToken')
    if (jwt) {
      this.user.authenticated = true
      this.config.headers.authToken = jwt
    } else {
      this.user.authenticated = false
    }
  }
}
