// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory } from 'vue-router'
import { logInRouteGuardDelegate } from '../utils/spotifyAccount'

import HomeComponent from './../views/Home.vue'
/** @type{VueRouter.RouterOptions} */
export const LOGIN_REDIRECT_ROUTE_NAME = 'LoginRedirect'

/** @type{RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/loginRedirect',
    name: LOGIN_REDIRECT_ROUTE_NAME,
    beforeEnter (to, from, next) {
      logInRouteGuardDelegate()
        .then(_ => (console.log('Route-Guard fertig')))
        .catch(e => {
          console.error(e)
          alert(e.message)
        })
        .finally(() => next('/'))
    }
  }
]

export default createRouter(
  {
    history: createWebHistory(),
    routes
  }
)
