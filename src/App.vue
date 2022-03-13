<script setup>
import myTransport from './components/myTransport.vue'
import { useSpotifyLogIn } from './utils/spotifyAccountComp.js'
import SelectFromLastTracks from './components/SelectFromLastTracks.vue'
import { useRoute } from 'vue-router'
// eslint-disable-next-line no-unused-vars
const { spotifyUserProfile } = useSpotifyLogIn()

const route = useRoute()
</script>

<template>
  <div
    class="sportartlistApp flex flex-column justify-between bg-black"
  >
    <header>
      <div class="navbar text-white text-sm">
        <div class="flex-1">
          <a class="btn btn-ghost btn-sm normal-case text-xl">SpotArtList</a>
        </div>
        <router-link
          v-if="route.path !== '/currentTrack'"
          to="/currentTrack"
        >
          <template #default>
            <button class="btn btn-ghost btn-sm">
              Zu "läuft gerade"
            </button>
          </template>
        </router-link>
        <!-- <select-from-last-tracks /> -->
      </div>
      <my-transport class="py-2" />
    </header>

    <main class="myAppBg flex-grow mb-16">
      <template v-if="!!spotifyUserProfile">
        <router-view />
        <select-from-last-tracks />
      </template>
      <span v-else>Du konntest scheinbar nicht angemeldet werden. Doof, oder?</span>
    </main>
    <!-- < class="footer p-2 mb-10 bg-black text-neutral-content"> -->
  </div>
</template>
