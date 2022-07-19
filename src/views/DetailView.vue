<template>
    <div class="app-page">
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap" >
                <router-link to="/history" class="breadcrumb">История</router-link>
                <a @click.prevent class="breadcrumb">
                    {{record.type === 'income' ? 'Доход' : 'Расход'}}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="{
                        'red': record.type === 'outcome',
                        'green': record.type === 'income'
                    }">
                        <div class="card-content white-text">
                            <p>Описание: {{record.description}}</p>
                            <p>Сумма: {{record.amount}} Р</p>
                            <p>Категория: {{record.category.name}}</p>

                            <small>{{record.date}}</small>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <p class="center" v-else>Запись с id={{$route.params.id}} не найдена</p>
    </div>
</template>
<script>
export default {
    name: 'detail',
    data: () => ({
        record: null,
        loading: true
    }),
    async mounted() {
        const id = this.$route.params.id
        const result = await this.$store.dispatch('fetchRecordById', id)
        const record = result.transaction
        this.record = {
            ...record
        }
        this.loading = false
    }
}
</script>
