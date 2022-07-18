import axios from 'axios'
export default{
    actions: {
        async createRecord(context, record) {
            try{
                const config = await context.getters.configRequestHeaders
                await axios.post('http://crm.test/api/transaction/add', record, config) 
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async fetchRecords(context) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/transaction', config) 
                return result.data.transactions
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        }
    }
}
