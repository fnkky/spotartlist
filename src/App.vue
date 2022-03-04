<script setup>
import myTransport from './components/myTransport.vue'
import { useSpotifyLogIn } from './utils/spotifyAccountComp.js'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

</script>

<template>
  <div class="sportartlistApp bg-base-100 h-full flex flex-column">
    <header>
      <div class="navbar  text-white">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">SpotArtList</a>
        </div>
        <div class="flex-none">
          {{ spotifyUserProfile?.id }}
        </div>
      </div>
    </header>

    <main class="myAppBg flex-grow">
      <router-view />
    </main>
    <footer class="footer p-2 bg-neutral text-neutral-content">
      <my-transport />
    </footer>
  </div>
</template>

<style>
html, body {
    margin: 0;
    height: 100%;
}

</style>
