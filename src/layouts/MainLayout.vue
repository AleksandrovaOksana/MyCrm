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
  <router-link class="btn-floating btn-large blue" to="/record">
    <i class="large material-icons">add</i>
  </router-link>
</div>
</div>
</template>

<script>
import Navbar from '@/components/app/NavbarView.vue'
import Sidebar from '@/components/app/SidebarView.vue'
import axios from 'axios'
export default {
    name: 'main-layout',
    data: () => ({
        isOpen: true
    }),
    components: {
        Navbar, Sidebar
    },
    async created() {
      if (localStorage.getItem('access_token')){
        const config ={ headers: {"Authorization" : `Bearer ${localStorage.getItem('access_token')}`} };
        try{
          await axios.get('http://crm.test/api/auth/me',config)
        } catch(e){
            const response = await axios.get('http://crm.test/api/auth/refresh',config)
            localStorage.setItem('access_token', response.data.access_token)
        }
      }
    }

}
</script>
