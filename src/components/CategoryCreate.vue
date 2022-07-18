<template>
    <div class="col s12 m6">
        <div>
        <div class="page-subtitle">
            <h4>Создать</h4>
        </div>

        <form @submit.prevent="submitHandler">
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
            Создать
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
    data() {
        return {
            title:'',
            limit: 1
        }
    },
    validations() {
        return{
            title: {required},
            limit: {minValue: minValue(1)}
        }
    },
    mounted(){
        M.updateTextFields();
    },
    methods: {
        async submitHandler(){
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
        try {
            const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit
        })
        this.title = ''
        this.limit = 1
        this.v$.$reset()
        this.$message(`Категория ${category.title} создана`)
        this.$emit('created', category)
        } catch(e) {console.log(e)}
    }}
}
</script>
