// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Event from './core/Event'

import './css/style.css'
import './fonts/iconfont.css'

import './css/swiper.min.css'
import {Swiper} from 'vue-awesome-swiper'
Vue.prototype.$Swiper = Swiper
import axios from 'axios'
Vue.prototype.$axios = axios

// modal的方法
Vue.prototype.$modal = {
	showModal(content){
		Event.$emit('modal/show', content)
	}
}

import './css/main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, },
  template: '<App/>'
})
