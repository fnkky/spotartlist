<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue-demi'
import SpotifyConnect from './components/spotifyconnect.vue'
onMounted(() => {
  console.log('App Mounted')
})
</script>

<template>
  <SpotifyConnect />
  <hr>
  <router-view />
</template>
