<template>
    <div class="col s12 m6">
        <div>
        <div class="page-subtitle">
            <h4>Редактировать</h4>
        </div>
        <form @submit.prevent="submitHandler">
            <div class="input-field" >
            <select ref="select" v-model="current">
                <option v-for="c of categories"
                :key="c.id"
                :value="c.id">
                    {{c.name}}
                </option>
            </select>
            <label>Выберите категорию</label>
            </div>

            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model="title"
                    :class="{invalid:v$.title.$silentErrors.length}"
                >
                <label for="name">Название</label>
                <div v-for="error of v$.title.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите название категории
                    </span>
                </div>
            </div>

              <div class="input-field">
                <input
                    id="limit"
                    type="number"
                    v-model.number="limit"
                    :class="{invalid:v$.title.$silentErrors.length}"
                >
                <label for="limit">Лимит</label>
                <div v-for="error of v$.limit.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Укажите положительное значение
                    </span>
                </div>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            Обновить
            <i class="material-icons right">send</i>
            </button>
        </form>
        </div>
    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {required, minValue} from '@vuelidate/validators'

export default{
    setup() {
        return { 
            v$: useVuelidate() 
        }
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        select: null,
        title:'',
        limit: 1,
        current: null
    }),
    validations() {
        return{
            title: {required},
            limit: {minValue: minValue(1)}
        }
    },
    watch: {
        current(catId) {
            const {name, limit} = this.categories.find(c => c.id === catId)
            this.title = name
            this.limit = limit
        }
    },
    created() {
        const {id, name, limit} = this.categories[0]
        this.current = id
        this.title = name
        this.limit = limit
        console.log(id)
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                await this.$store.dispatch('updateCategory', categoryData)
                this.$message('Категория успешно обновлена')
                this.$emit('updated', categoryData)

            } catch (e) {console.log(e)}
        }
    },
    mounted(){
        M.updateTextFields();
        this.select = M.FormSelect.init(this.$refs.select);
    },
    unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
}
</script>
