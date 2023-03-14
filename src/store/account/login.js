import { getAbility } from '@/helpers/permission'
import { errorHandler } from '@/services/toastHandler'

const state = () => ({
  loading: false,
  error: '',
})

export default {
  namespaced: true,
  state: state(),

  mutations: {
    LOADING: s => Object.assign(s, state(), { loading: true }),
    SET_ERROR: (s, error) => (s.error = error),
    LOADED: s => (s.loading = false),
  },

  actions: {
    async loginAsync({ commit, dispatch }, payload) {
      commit('LOADING')
      try {
        let auth = {
          userName: payload.userName,
          isLoggedIn: false,
        }
        if (payload.userName === 'admin' && payload.password === process.env.VUE_APP_AUTH_PASSWORD) {
          auth = {
            userName: payload.userName,
            isLoggedIn: true,
          }
        }

        dispatch('auth/setAbility', getAbility(auth.isLoggedIn), { root: true })
        dispatch('auth/setAuth', auth, { root: true })
        return auth
      } catch (error) {
        errorHandler(error)
      } finally {
        commit('LOADED')
      }
    },
  },
}
