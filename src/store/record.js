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
        async fetchRecords(context, page) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/transaction?page=' + page, config)
                return result.data
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        },
        async fetchRecordById(context, id) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/transaction/' + id, config)
                const record = result.data
                return {...record, id}
            } catch (e) {
                context.commit('setError', e)
                throw e
            }
        }
    }
}
