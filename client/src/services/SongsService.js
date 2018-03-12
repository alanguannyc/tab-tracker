import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  create (song) {
    return Api().post('songs', song)
  },
  show (id) {
    return Api().get(`songs/${id}`)
  }
}