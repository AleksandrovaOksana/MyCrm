import axios from 'axios'
export default{
    actions: {
        async getAccount(context) {
            try{
                const config = await context.getters.configRequestHeaders
                const user = await context.getters.user
                console.log(user)
                const result = await axios.get('http://crm.test/api/account/' + user.id, config) 
                context.commit('setAccount', result.data.account)
                return result.data.account

            } catch(e){console.log(e)}
        }
    }

}
