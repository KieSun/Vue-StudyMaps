import Vue from 'vue'
import Router from 'vue-router'
import Ray from 'page/ray'
import CssTricks from 'page/css-tricks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/raywenderlich'
    },
    {
      path: '/raywenderlich/:page(\\d+)?',
      component: Ray
    },
    {
      path: '/css-tricks/:page(\\d+)?',
      component: CssTricks
    }
  ]
})
