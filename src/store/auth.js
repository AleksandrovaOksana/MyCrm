import axios from 'axios'
export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try{
                const result = await axios.post('http://crm.test/api/auth/login', {email, password}) 
                const token = result.data.access_token
                localStorage.setItem('access_token', token)
                  console.log(dispatch, commit, result)
            } catch (e){
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try{
                const result = await axios.post('http://crm.test/api/auth/register', {email, password, name})
                const token = result.data.access_token
                localStorage.setItem('access_token', token)
                const config ={ headers: {"Authorization" : `Bearer ${localStorage.getItem('access_token')}`} };
                const uid = await dispatch('getUid', config)
                await axios.post('http://crm.test/api/account/store', {total: 10000, uid: uid}, config).then((response) => {
                    console.log(response.data);
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
    }
}
