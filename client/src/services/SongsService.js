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
  },
  edit (song) {
    return Api().put(`songs/${song.id}`, song)
  },
  delete (id) {
    return Api().delete(`songs/${id}`)
  }
}
