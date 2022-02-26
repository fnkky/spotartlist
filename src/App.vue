<script setup>
import { useSpotifyLogIn } from './utils/spotifyAccountComp'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

</script>

<template>
  <div>angmeledet als {{ spotifyUserProfile?.id }}</div>
  <router-view />
</template>
