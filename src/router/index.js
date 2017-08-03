import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Lists = type => () =>
  import('../page/Lists.js').then(m => m.default(type))

export default new Router({
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
