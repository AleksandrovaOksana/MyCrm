<template>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('showBar')">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{dateFormated}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >
              {{this.user ? this.user.name : 'USER NAME'}}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
import M from 'materialize-css'
import dateFilter from '@/filter/date.filter'
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    user: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
   mounted() {
    this.interval = setInterval(() =>{
      this.date = new Date()
    },1000)
    this.dropdown = M.Dropdown.init(this.$refs.dropdown,{
      constrainWidth: false
    })
     const user =   this.$store.getters.user
     this.user = user
     console.log(user)
  },
  beforeUnmount() {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    dateFormated() {
      return dateFilter(this.date, 'datetime')
    }
  }
}
</script>
