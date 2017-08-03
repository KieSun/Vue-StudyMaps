import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const Lists = type => () =>
  import('../page/Lists.js').then(m => m.default(type))

let router = new Router({
  routes: [{
    path: '/',
    redirect: '/raywenderlich'
  },
  {
    path: '/raywenderlich/:page(\\d+)?',
    component: Lists('raywenderlich')
  },
  {
    path: '/csstricks/:page(\\d+)?',
    component: Lists('csstricks')
  }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(store.state.type)
  next()
})

export default router
