import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMaterial from 'vue-material'
import EmbarkJS from 'Embark/EmbarkJS'
import web3 from "Embark/web3"
import TreeToken from 'Embark/contracts/TreeToken'
import TreeMarket from 'Embark/contracts/TreeMarket'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' 
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueMaterial.default);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
