<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from 'vue-demi'
import { useUserStore } from '../stores/user'
import { spotifyLoginDelegate } from '../utils/spotifyAccount'

const userStore = useUserStore()
onMounted(() => {
  userStore.readUserProfile()
    .catch(e => {
      console.error(e)
      debugger
      spotifyLoginDelegate()
    })
})

</script>

<template>
  <h1>Spotify Connect</h1>
  <pre>{{ userStore }}</pre>
  <hr />
  <button type="button" @click="spotifyLoginDelegate()">Anmelden</button>

  <button type="button" @click="userStore.readUserProfile()">User-Informationen lesen</button>
</template>
