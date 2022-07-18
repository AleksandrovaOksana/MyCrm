<template>
  <div class="app-main-layout">
    <Navbar @showBar="isOpen = !isOpen" />
    <Sidebar v-bind:value="isOpen" />

    

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
</main>

<div class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
</template>

<script>
import Navbar from '@/components/app/NavbarView.vue'
import Sidebar from '@/components/app/SidebarView.vue'
import messages from '@/utils/messages'
export default {
    name: 'main-layout',
    data: () => ({
        isOpen: true
    }),
    components: {
        Navbar, Sidebar
    },
    beforeCreate() {
      // if (this.$store.getters.token.expires_in <= 0) {
      //   this.$store.dispatch('refreshToken')
      // }
    },
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
