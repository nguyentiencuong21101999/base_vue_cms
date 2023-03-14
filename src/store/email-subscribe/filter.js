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
    LOADING: s => Object.assign(s, initState(), { loading: true }),
    SET_ERROR: (s, error) => (s.error = error),
    LOADED: s => (s.loading = false),
    RESET: s => Object.assign(s, initState()),
  },

  actions: {
    async getDomainFilterListAsync({ commit }) {
      commit('RESET')
      commit('LOADING')
      try {
        const res = await this.$api.get('/email/subscribe/domain', {})
        const domainFilterList = res.data.data ?? []

        return domainFilterList
      } catch (e) {
        errorHandler(e)
      } finally {
        commit('LOADED')
      }
    },
  },
}
