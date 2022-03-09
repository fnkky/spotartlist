<script setup>
import myTransport from './components/myTransport.vue'
import { useSpotifyLogIn } from './utils/spotifyAccountComp.js'
import SelectFromLastTracks from './components/SelectFromLastTracks.vue'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

</script>

<template>
  <div
    class="sportartlistApp bg-base-100 flex flex-column h-screen justify-between"
  >
    <header class="flex-shrink-0">
      <div class="navbar  text-white">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">SpotArtList</a>
        </div>
        <router-link
          to="/currentTrack"
        >
          <template #default>
            <button class="btn btn-ghost">
              läuft gerade
            </button>
          </template>
        </router-link>
        <select-from-last-tracks />
      </div>
    </header>
    <hr>

    <main class="myAppBg flex-grow overflow-auto mb-16">
      <router-view v-if="!!spotifyUserProfile" />
      <span v-else>Du konntest scheinbar nicht angemeldet werden. Doof, oder?</span>
    </main>
    <footer class="footer p-2 bg-neutral text-neutral-content fixed bottom-0">
      <my-transport />
    </footer>
  </div>
</template>
