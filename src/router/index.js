import Vue from 'vue'
import Router from 'vue-router'
import Ray from 'page/ray'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/raywenderlich'
    },
    {
      path: '/raywenderlich',
      component: Ray
    }
  ]
})
