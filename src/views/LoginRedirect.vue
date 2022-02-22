<template>
  <h1>
    das ist die loginRedirect seite
  </h1>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

import { getAccessToken, logInRouteGuardDelegate } from '../utils/spotifyAccount'
// eslint-disable-next-line no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'
/** @type{SpotifyWebApi.SpotifyWebApiJs} */
const spotifyApi = inject('spotifyApi')

const router = useRouter()
const userStore = useUserStore()


onMounted(() => {
  const rnd = Math.random()
  console.log('Jetzt im OnMounted von LoginRedirect.vue', rnd)
  logInRouteGuardDelegate()
    .then(() => {
      userStore.readUserProfile()
    })
    .then(() => {
      spotifyApi.setAccessToken(getAccessToken())
    })
    .then(() => {
      router.replace({
        name: 'home'
      })
    })
})
</script>
