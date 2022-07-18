import axios from 'axios'
export default{
    actions: {
        async fetchCategories(context){
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.get('http://crm.test/api/category', config) 
                return result.data.categories
                
                
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async updateCategory(context, {title, limit, id}) {
            try {
                
                const config = await context.getters.configRequestHeaders
                const result= await axios.put('http://crm.test/api/category/update/'+id, {name: title, limit}, config) 
                console.log(result)
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        },
        async createCategory(context, {title, limit}) {
            try {
                const config = await context.getters.configRequestHeaders
                const result = await axios.post('http://crm.test/api/category/add', {name: title, limit}, config) 
                return {title, limit, id: result.data.id}
            }catch (e) {
                await context.commit('setError', e)
                throw e
            }
        }
    }
}
