<script setup>

import AktuellerTitel from '../components/aktuellerTitel.vue'
import { useSpotifyLogIn } from '../utils/spotifyAccountComp'

const { spotifyUserProfile } = useSpotifyLogIn()

</script>
<template>
  <div v-if="!!spotifyUserProfile">
    <AktuellerTitel />
  </div>
  <div v-else>
    User ist noch nicht angemeldet
  </div>
</template>
