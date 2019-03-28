import Vue from 'vue'
import Router from 'vue-router'

import index from '@/pages/index'
import login from '@/pages/login'
import signup from '@/pages/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})
