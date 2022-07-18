import axios from 'axios'
export default {
    actions: {
        async login(context, {email, password}){
            try{
                const result = await axios.post('http://crm.test/api/auth/login', {email, password}) 

                await context.commit('setToken', result.data)
                const user = await context.dispatch('getUser', context.getters.configRequestHeaders)
                await context.commit('setUser', user)
  
            } catch (e){
                context.commit('setError', e)
                throw e
            }
        },
        async register(context, {email, password, name}) {
            try{
                const result = await axios.post('http://crm.test/api/auth/register', {email, password, name})
                await context.commit('setToken', result.data)
                await context.dispatch ('autoRefresh')
                const user = await context.dispatch('getUser', context.getters.configRequestHeaders)
                await context.commit('setUser', user)
                await axios.post('http://crm.test/api/account/store', {total: 10000, uid: user.id}, context.getters.configRequestHeaders).then((response) => {
                    if(response.data.uid){
                        this.$message('Начальный аккаунт успешно создан')
                    }

                })
            } catch (e){
                context.commit('setError', e)
                throw e
            }
            
        },
        async getUser({}, config) {
            const response = await axios.get('http://crm.test/api/auth/me',config)
            const user = response.data.user
            return user ? user : null
        },
        async logout() {
            await axios.get('http://crm.test/api/auth/logout').then((response) => {
                console.log(response)
            })
        },
        async refreshToken({commit}){
            const response = await axios.get('http://crm.test/api/auth/refresh', this.$store.getters.configRequestHeaders)
            commit('setToken', response.data)
            this.autoRefresh()
        },
        autoRefresh(context){
            console.log(context)
            // setTimeout(this.refreshToken, this.$store.getters.token.expires_in * 1000)

            // const token = {
            //     "access_token": this.$store.getters.token.access_token,
            //     "token_type": this.$store.getters.token.token_type,
            //     "expires_in": this.$store.getters.token.expires_in - 1
            // }
            // commit('setToken', token)
        }
    }
   
}
