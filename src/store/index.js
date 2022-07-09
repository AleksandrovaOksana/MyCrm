import { createStore } from 'vuex'
import auth from './auth'

export default createStore({
  state: {
    error: null,
    configRequestHeaders: null,
    token: null
  },
  getters: {
    error: s => s.error,
    configRequestHeaders: s => s.configRequestHeaders,
    token: s => s.token
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) { 
    state.error = null},
    setConfigRequestHeaders(state, config){
      state.configRequestHeaders = config
    },
    clearConfigRequestHeaders(state){
      state.configRequestHeaders = null
    },
    setToken({state, commit}, token){
      state.token = token
      const config ={ headers: {"Authorization" : `Bearer ${token.access_token}`} };
      commit('setConfigRequestHeaders', config)
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
