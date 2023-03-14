const state = () => ({
  accessToken: '',
  user: '',
  ability: '',
  error: null,
})

export default {
  namespaced: true,

  state: state(),

  getters: {
    isLoggedIn(s) {
      return s.isLoggedIn
    },
  },

  mutations: {
    SET_AUTH: (s, payload) => {
      s.isLoggedIn = payload.isLoggedIn
      s.user = payload
    },
    SET_ABILITY: (s, payload) => (s.ability = payload),
    PURGE_AUTH: s => Object.assign(s, state()),
  },

  actions: {
    setAuth({ commit }, payload) {
      commit('SET_AUTH', payload)
    },
    setAbility({ commit }, payload) {
      commit('SET_ABILITY', payload)
    },
    purgeAuth({ commit }) {
      commit('PURGE_AUTH')
    },
  },
}
