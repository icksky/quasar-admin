import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { StateInterface } from 'src/store'
import { constantRoutes, asyncRoutes } from './routes'
import asyncRoutesMap from './async-routes-map'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export const router = new VueRouter({
  scrollBehavior: (_, __, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRoutes.concat(asyncRoutes),

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
})

export default route<Store<StateInterface>>(function ({ Vue }) {
  Vue.use(VueRouter)

  return router
})

export {
  constantRoutes,
  asyncRoutes,
  asyncRoutesMap,
}
