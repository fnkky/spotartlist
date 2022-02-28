<script setup>
import { useSpotifyLogIn } from './utils/spotifyAccountComp.js'
import { useSpotifyTransport } from './utils/transportComp.js'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

const { nextSong, previousSong } = useSpotifyTransport()

</script>

<template>
  <v-app style="height: 100vh;">
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
    <v-footer app>
      <div class="d-flex justify-between w-full">
        <v-btn
          icon
          @click="previousSong"
        >
          <v-icon>mdi-skip-backward</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="nextSong"
        >
          <v-icon>mdi-skip-forward</v-icon>
        </v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<style>
html, body {
    margin: 0;
    height: 100%;
}
</style>
