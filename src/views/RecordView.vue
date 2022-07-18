<template>
    <div>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>
  <Loader v-if="loading" />
  <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
  <form class="form" v-else @submit.prevent="handleSubmit">
    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
        >{{c.name}}</option>
      </select>
      <label>Выберите категорию</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Доход</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Расход</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid:v$.amount.$silentErrors.length}"
        
      >
      <label for="amount">Сумма</label>
      <div v-for="error of v$.amount.$silentErrors" :key="error.$uid">
        <span class="helper-text invalid">
            Укажите положительное значение
        </span>
      </div>
    </div>

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid:v$.description.$silentErrors.length}"
      >
      <label for="description">Описание</label>
      <div v-for="error of v$.description.$silentErrors" :key="error.$uid">
                    <span class="helper-text invalid">
                        Введите описание
                    </span>
                </div>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import {required, minValue} from '@vuelidate/validators'

export default ({
  setup() {
        return { 
            v$: useVuelidate() 
        }
    },
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
    account: null
  }),
  validations() {
        return{
            amount: {minValue: minValue(1)},
            description: {required}
        }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      
      this.select = M.FormSelect.init(this.$refs.select)
    }, 0)
    
  },
  computed: {
     canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      const account =  this.$store.getters.account
      this.account = account
      return account.total >= this.amount

      
    }
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
            }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
          category_id: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type
        })
        await this.$store.dispatch('getAccount')
        this.$message('Запись успешно создана')
        this.v$.$reset()
        this.amount = 1
        this.description = ''
        } catch (e) {}
      } else{
        this.$message(`Недостаточно средств на счете (${this.amount - this.account.total})`)
      }
    }
  },
  unmounted() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
})
</script>
