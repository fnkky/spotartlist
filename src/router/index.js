// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHistory } from 'vue-router'

import AktuellerTitel from './../views/aktuellerTitel.vue'
import SpecificTitel from './../views/SpecificTitel.vue'

export const ROUTE_SPECIFIC_TRACK = 'ROUTE_SPECIFIC_TRACK'
const routes = [
  {
    path: '',
    redirect: '/currentTrack'
  },
  {
    path: '/currentTrack',
    component: AktuellerTitel,
    meta: {
      title: 'Aktuell laufender Titel'
    }
  },
  {
    path: '/specific/:trackId',
    name: ROUTE_SPECIFIC_TRACK,
    component: SpecificTitel,
    props: true,
    meta: {
      title: 'Wurde kürzlich gespielt'
    }
  }

]

export default createRouter(
  {
    history: createWebHistory(),
    routes
  }
)
