import axios from 'axios'
// fMBxp1HsPXnSBK1DiRghqNFF

export default {
  all() {
    return axios.get('https://dev.to/api/articles/me')
  }
}
