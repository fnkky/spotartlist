// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory } from 'vue-router'

import AktuellerTitel from './../views/aktuellerTitel.vue'

const routes = [
  {
    path: '',
    redirect: '/currentTrack'
  },
  {
    path: '/currentTrack',
    component: AktuellerTitel
  }

]

export default createRouter(
  {
    history: createWebHistory(),
    routes
  }
)
