import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('user/register', credentials)
  },
  home () {
    return Api().get('/')
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  }
}
