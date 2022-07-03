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
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid:$v.name.required.$invalid}"  
      >
      <label for="name">Имя</label>
      <small class="helper-text invalid" v-if="$v.name.required.$invalid">Введите имя</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {email, required, minLength} from 'vuelidate/lib/validators'
export default {
  setup () {
            return { v$: useVuelidate() }
        },
        name: 'register-page',
        data (){
            return {
                $v: useVuelidate(),
                email: '',
                password: '',
                name: '',
                agree: false
            }
        },
        validations: {
                email: {email, required},
                password: {required, min: minLength(3)},
                name: {required},
                agree: {cheked: v => v}
        },
        methods: {
          async submitHandler(){
                const isFormCorrect = await this.v$.$validate()
                if (!isFormCorrect) return
                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }
                try{
                await this.$store.dispatch('register', formData)
                this.$router.push('/')
                } catch (e) {console.log(e) }
               
            }
        }
}
</script>
