import axios from 'axios'
export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try{
                const result = await axios.post('http://crm.test/api/auth/login', {email, password}) 
                commit('setToken', result.data)
                
                  console.log(dispatch)
  
            } catch (e){
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try{
                const result = await axios.post('http://crm.test/api/auth/register', {email, password, name})
                commit('setToken', result.data)
                const uid = await dispatch('getUid', this.$store.getters.configRequestHeaders)
                await axios.post('http://crm.test/api/account/store', {total: 10000, uid: uid}, this.$store.getters.configRequestHeaders).then((response) => {
                    if(response.data.uid){
                        this.$message('Начальный аккаунт успешно создан')
                    }

                })
                  console.log(dispatch)
            } catch (e){
                commit('setError', e)
                throw e
            }
            
        },
        async getUid({dispatch}, config) {
            const user = await axios.get('http://crm.test/api/auth/me',config).then((response) => {
                return response.data
            })
            console.log(dispatch, user)
            return user ? user.id : null
        },
        async logout() {
            await axios.get('http://crm.test/api/auth/logout').then((response) => {
                console.log(response)
            })
        }
    },
    async refreshToken(){
        const response = await axios.get('http://crm.test/api/auth/refresh', this.$store.getters.configRequestHeaders)
        commit('setToken', response.data)
        this.autoRefresh()
    },
    autoRefresh(){
        setTimeout(this.refreshToken, this.$store.getters.token.expires_in * 1000)
        const token = {
            "access_token": this.$store.getters.token.access_token,
            "token_type": this.$store.getters.token.token_type,
            "expires_in": this.$store.getters.token.expires_in - 1
        }
        commit('setToken', token)
    }
}
