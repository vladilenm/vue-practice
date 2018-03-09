import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import './stylus/main.styl'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // theme: {
  //   primary: "#f44336",
  //   secondary: "#9575CD",
  //   accent: "#9c27b0",
  //   error: "#f44336",
  //   warning: "#3949AB",
  //   info: "#2196f3",
  //   success: "#4caf50"
  // }
})
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
    fb.initializeApp({
      apiKey: 'AIzaSyD5mgcTCPSiTxPfmTmBmPFWZU7GdR9l1BQ',
      authDomain: 'itc-ads.firebaseapp.com',
      databaseURL: 'https://itc-ads.firebaseio.com',
      projectId: 'itc-ads',
      storageBucket: 'itc-ads.appspot.com',
      messagingSenderId: '145551978680'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
