// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './css/style.css'
import './fonts/iconfont.css'

import './css/swiper.min.css'
import {Swiper} from 'vue-awesome-swiper'
window.Swiper = Swiper
import api from './js/api.js'
window.api = api

import './css/main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
