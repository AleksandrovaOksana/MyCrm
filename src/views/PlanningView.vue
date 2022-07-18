<template>
    <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>
        <span v-if="this.account">{{this.account.total}} Р</span>
        <span v-else>Нет данных</span>
    </h4>
  </div>
  <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
  <section v-else>
    <div v-for="cat of categories" :key="cat.id">
      <p>
        <strong>{{cat.name}}:</strong>
        {{cat.spend}} Р из {{cat.limit}} Р
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{'width': cat.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

  export default {
    name: 'planning',
    data: () => ({
      loading: true,
      categories: [],
      account: null
    }),
    async mounted() {
      const result = await this.$store.dispatch('getAccount')
      this.account = result
      
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')
      console.log(records, categories)
      this.categories = categories.map(cat => {
        const spend = records
        .filter(r => r.category.id === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        },0)
        const percent = (100 * spend / cat.limit)
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

        const tooltipValue = cat.limit -spend
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${Math.abs(tooltipValue)}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })
      this.loading = false
    }
  }
</script>
