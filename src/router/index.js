import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: 'index'
}, {
  path: '/index',
  name: 'index',
  meta: {
    title: '入口',
    keepAlive: true
  },
  component: resolve => {
    require.ensure(
      ['../page/index'],
      () => {
        resolve(require('../page/index'))
      },
      'index'
    )
  }
}]

const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

const title = document.title

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = title
  }
  if (to.matched.length === 0) {
    next('/')
  } else {
    next()
  }
})
export {
  routes,
  router
}
export default router
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
