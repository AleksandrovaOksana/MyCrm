<template>
    
    <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: $v.email.required.$invalid || $v.email.email.$invalid}"  
        >
        <label for="email">Email</label>
      
            <small class="helper-text invalid" v-if="$v.email.required.$invalid || $v.email.email.$invalid" >Введите корректный email</small>
  
        </div>
        <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid:$v.password.required.$invalid || $v.password.min.$invalid}"  
        >
        <label for="password">Пароль</label>
    
                <small class="helper-text invalid" v-if="$v.password.required.$invalid || $v.password.min.$invalid">Введите корректный пароль </small>
            
        </div>
    </div>
    <div class="card-action">
        <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
            Войти
            <i class="material-icons right">send</i>
        </button>
        </div>

        <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
        </p>
    </div>
    </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'


    export default {
        setup () {
            return { v$: useVuelidate() }
        },
        name: 'login-page',
        data (){
            return {
                $v: useVuelidate(),
                email: '',
                password: '',
            }
        },
        validations: {
                email: {email, required},
                password: {required, min: minLength(3)}
        },
        mounted() {
            if (messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
        },
        methods: {
            async submitHandler(){
                const isFormCorrect = await this.v$.$validate()
                if (!isFormCorrect) return
                const formData = {
                    email: this.email,
                    password: this.password
                }
                try{
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                } catch(e) {console.error(e)}
                
            }
        }
    }
</script>
