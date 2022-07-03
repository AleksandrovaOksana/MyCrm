<template>
    <div class="grey darken-1 empty-layout">
        <router-view />
    </div>
</template>
<script>
import messages from '@/utils/messages'
export default {
    computed: {
        error() {
            this.$store.getters.error
        }
    },
    created() {
        this.unwatch = this.$store.watch(
        (state, getters) => getters.error,
        (newValue) => {
            console.log(newValue);
            this.$error(messages[newValue.code] || 'Что-то пошло не так')

            },
        );
    }
}
</script>
