<script setup>
import myTransport from './components/myTransport.vue'
import { useSpotifyLogIn } from './utils/spotifyAccountComp.js'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

</script>

<template>
  <v-app
    style="height: 100vh;"
    class="d-flex flex-col"
  >
    <v-app-bar
      app
    >
      <div class="d-flex justify-between w-full align-baseline">
        <h1 class="text-h4">
          SpotArtList
        </h1>
        <div>{{ spotifyUserProfile?.id }}</div>
      </div>
    </v-app-bar>
    <v-main
      app
      class="myAppBg flex-grow"
    >
      <router-view />
    </v-main>
    <v-footer
      class="flex-grow-0"
      app
    >
      <my-transport />
    </v-footer>
  </v-app>
</template>

<style>
html, body {
    margin: 0;
    height: 100%;
}

</style>
