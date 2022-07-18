import { createStore } from 'vuex'
import auth from './auth'
import category from './category'
import account from './account'
import record from './record'

export default createStore({
  state: {
    error: null,
    configRequestHeaders: null,
    token: null,
    user: null,
    account: null
  },
  getters: {
    error: s => s.error,
    configRequestHeaders: s => s.configRequestHeaders,
    token: s => s.token,
    user: s => s.user,
    account: s => s.account
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setAccount(state, account) {
      state.account = account
    },
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
    async setToken(state, token){

      state.token = token
      const config ={ headers: {"Authorization" : `Bearer ${token.access_token}`} };
      await this.commit('setConfigRequestHeaders', config)

    }
  },
  actions: {
    
  },
  modules: {
    auth, category, account, record
  }
})
