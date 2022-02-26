// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory } from 'vue-router'

import HomeComponent from './../views/Home.vue'
// import LoginRedirect from './../views/LoginRedirect.vue'
export const LOGIN_REDIRECT_ROUTE_NAME = 'LoginRedirect'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  }
]

export default createRouter(
  {
    history: createWebHistory(),
    routes
  }
)
