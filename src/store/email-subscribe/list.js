import { errorHandler } from '@/services/toastHandler'

const initState = () => ({
  transactions: [],
  loading: false,
  error: '',
  totalPage: 0,
})

export default {
  namespaced: true,
  state: initState(),

  mutations: {
    SET_EMAIL_SUBSCRIBE_LIST: (s, emailSubscribes) => (s.emailSubscribes = emailSubscribes),
    SET_TOTAL_PAGE: (s, totalPage) => (s.totalPage = totalPage),
    LOADING: s => Object.assign(s, initState(), { loading: true }),
    SET_ERROR: (s, error) => (s.error = error),
    LOADED: s => (s.loading = false),
    RESET: s => Object.assign(s, initState()),
  },

  actions: {
    async getListEmailSubscribeAsync({ commit }, params) {
      commit('RESET')
      commit('LOADING')
      try {
        const res = await this.$api.get('/email/subscribe', { params })

        const { total } = res.data.pagination
        const emailSubscribeList = res.data.data

        commit('SET_EMAIL_SUBSCRIBE_LIST', emailSubscribeList)
        commit('SET_TOTAL_PAGE', total)
        return emailSubscribeList
      } catch (e) {
        errorHandler(e)
      } finally {
        commit('LOADED')
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async getAllListEmailSubscribeAsync() {
      try {
        const params = {
          limit: 17446744073709551000,
          page: 1,
        }
        const res = await this.$api.get('/email/subscribe', { params })
        const emailSubscribeList = res.data.data
        return emailSubscribeList
      } catch (e) {
        return []
      }
    },
  },
}
