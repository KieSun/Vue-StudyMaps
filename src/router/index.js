import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const Lists = type => () =>
  import('../page/Lists.js').then(m => m.default(type))

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: '/zaoduke'
  },
  {
    path: '/raywenderlich/:page(\\d+)?',
    component: Lists('raywenderlich')
  },
  {
    path: '/csstricks/:page(\\d+)?',
    component: Lists('csstricks')
  },
  {
    path: '/zaoduke/:page(\\d+)?',
    component: Lists('zaoduke')
  },
  {
    path: '/wxyyxc1992/:page(\\d+)?',
    component: Lists('wxyyxc1992')
  }
  ]

})

router.beforeEach((to, from, next) => {
  store.state.page = to.params.page || 1
  store.state.type = to.path.match(/[a-zA-Z0-9]+/)[0]
  next()
})

export default router
