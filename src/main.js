import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MdButton, MdContent, MdBottomBar } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(MdBottomBar);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
