<script setup>
import { useSpotifyLogIn } from './utils/spotifyAccountComp'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

</script>

<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex justify-between">
        <h1 class="text-h4">
          SpotArtList
        </h1>
        <div>{{ spotifyUserProfile?.id }}</div>
      </div>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
