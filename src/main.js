import {createApp} from 'vue'
import { VuelidatePlugin } from '@vuelidate/core'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'


const app = createApp(App).use(store).use(router).use(VuelidatePlugin).use(messagePlugin, {}).use(VueAxios, axios)
app.config.globalProperties.axios=axios
app.mount('#app')
