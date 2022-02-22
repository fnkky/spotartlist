
<template>
  <div>
    <span v-if="userStore.profile">angemeldet als {{ userStore.userId }}</span>

    <button
      v-else
      type="button"
      @click="spotifyHelper.spotifyLoginDelegate()"
    >
      Anmelden
    </button>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { inject, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import * as spotifyHelper from '../utils/spotifyAccount.js'
// eslint-disable-next-line no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'
/** @type{SpotifyWebApi.SpotifyWebApiJs} */
const spotifyApi = inject('spotifyApi')

const userStore = useUserStore()

onMounted(() => {
  // auf der Login-Seite nichts machen
  if (location.hash.toLowerCase().indexOf('access_token') >= 0) {
    console.log('Auf Login-Seite mach ich nix')
    return undefined
  }

  // Wenn es keinen Token gibt -> anmeldeversuch starten
  spotifyHelper.forceLogedInState()
    .then(profile => {
      if (profile) {
        spotifyApi.setAccessToken(spotifyHelper.getAccessToken())
        userStore.setProfile(profile)
      }
    })
})

</script>
