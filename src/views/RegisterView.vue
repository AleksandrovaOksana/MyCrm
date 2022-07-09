<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid:$v.email.$silentErrors.length}"  
        >
        <label for="email">Email</label>
        <div  v-for="error of $v.email.$silentErrors" :key="error.$uid">
            <small class="helper-text invalid">{{this.translateErrorValidates(error.$validator)}}</small>

        </div>
    </div>
    <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid:$v.password.$silentErrors.length}"  
        >
        <label for="password">Пароль</label>
        <div v-for="error of $v.password.$silentErrors" :key="error.$uid">
            <small class="helper-text invalid">{{(error.$validator == 'min') ? this.translateErrorValidates(error.$validator) + $v.password.min.$params.min : this.translateErrorValidates(error.$validator) }} </small>
        </div>   
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid:$v.name.$silentErrors.length}"  
      >
      <label for="name">Имя</label>
      <div v-for="error of $v.name.$silentErrors" :key="error.$uid">
      <small class="helper-text invalid">{{this.translateErrorValidates(error.$validator)}}</small>
      </div>
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
import {email, required, minLength} from '@vuelidate/validators'
import formValidatesMessages from '@/utils/formValidatesMessages.plugin'

export default {
  setup () {
            return { $v: useVuelidate() }
        },
        name: 'register-page',
        data (){
            return {
              email: '',
              password: '',
              name: '',
              agree: false
            }
        },
        validations() {
          return {
            email: {email, required},
            password: {required, min: minLength(3)},
            name: {required},
            agree: {cheked: v => v}
            }
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
            },
            translateErrorValidates(validator) {
                return formValidatesMessages.getErrorValidate(validator)   
            }
        }
         
}
</script>
