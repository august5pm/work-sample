// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// common libs
import libs from './assets/js/AFP.libs'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueYoutube from 'vue-youtube'
import 'expose-loader?gsap!gsap'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(VueYoutube)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


