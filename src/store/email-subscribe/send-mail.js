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
    async sendMail({ commit }, payload) {
      commit('RESET')
      commit('LOADING')
      try {
        payload.grossSalary = Number(payload.grossSalary)
        payload.netSalary = Number(payload.netSalary)
        payload.actualSalary = Number(payload.actualSalary)
        payload.offerTime = Number(payload.offerTime)
        if (payload.cc?.length === 0) {
          delete payload.cc
        }
        const res = await this.$api.post('/email/send/offer', payload)
        return res.data.data
      } catch (e) {
        errorHandler(e)
      } finally {
        commit('LOADED')
      }
    },
    async sendInviteMail({ commit }, payload) {
      commit('RESET')
      commit('LOADING')
      try {
        if (payload.cc?.length === 0) {
          delete payload.cc
        }
        const res = await this.$api.post('/email/send/invite', payload)
        return res.data.data
      } catch (e) {
        errorHandler(e)
      } finally {
        commit('LOADED')
      }
    },
    async sendLetterMail({ commit }, payload) {
      commit('RESET')
      commit('LOADING')
      try {
        if (payload.cc?.length === 0) {
          delete payload.cc
        }
        const res = await this.$api.post('/email/send/letter', payload)
        return res.data.data
      } catch (e) {
        errorHandler(e)
      } finally {
        commit('LOADED')
      }
    },
  },
}
