<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SpotifyConnect from './components/spotifyconnect.vue'
import { provide, ref } from 'vue'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()

const data = ref({
  test: 'testinhalt',
  spotifyApi
})
provide('appData', data)
</script>

<template>
  <SpotifyConnect />
  <router-view />
</template>
