import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    if (localStorage.getItem('user')) {
      try {
        const cand = JSON.parse(localStorage.getItem('user'))

        if (cand && cand.id) {
          this.$store.dispatch('autoLoginUser', cand)
        }
      } catch (er) {}
    }

    this.$store.dispatch('fetchAds')
  }
})
