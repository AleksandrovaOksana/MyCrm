<template>
          <div class="app-page">

<div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  <Loader v-if="loading" />
  <p class="center" v-else-if="!records.length">
  Записей пока нет
  <router-link to="/record">Добавить новую запись</router-link>
  </p>
  <section v-else>
    <HistoryTable :records="records" />
  </section>
  <button @click="nextPage">следующая</button>
</div>

</div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import record from '@/store/record'
export default {
  name: 'history',
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    lastItem: ''
  }),
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')
    const res = await this.$store.dispatch('fetchRecords')
    const records = res.transactions
    this.lastItem = res.lastItem
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.category.id).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  components: {
    HistoryTable
  }, 
  methods:{
    async nextPage(){
    const res = await this.$store.dispatch('fetchRecords', this.lastItem)
    const records = res.transactions
    this.lastItem = res.lastItem
    console.log(res.lastItem)
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.category.id).name,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
    }
  }
}
</script>
