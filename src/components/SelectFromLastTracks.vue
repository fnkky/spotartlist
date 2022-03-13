<template>
  <div class="bg-slate-700 pb-4 rounded-b-sm mt-2">
    <div class="flex align-center justify-evenly">
      <ui-toggle-expanded v-model="showContent" />

      <h2 class="pt-2 pb-3 font-bold text-lg flex flex-grow justify-center text-primary">
        Zuletzt gehört (WIP)
      </h2>
      <ui-refresh-button
        :loading="loading"
        :hide="!showContent"
        @pressed="fetchData(true)"
      />
    </div>
    <v-transition>
      <div
        v-if="showContent"
        class="flex flex-col bg-slate-700 rounded-t-sm rounded-b-sm"
      >
        <ul
          tabindex="0"
          class="shadow bg-base-100 rounded-box w-full overflow-scroll h-96"
          style="top: 1rem"
        >
          <li
            v-for="item in lastTracks"
            :key="item.id"
          >
            <router-link :to="item.to">
              {{ item.dist }}
              <br>
              {{ item.artist }} - {{ item.song }}
            </router-link>
            <hr>
          </li>
        </ul>
      </div>
    </v-transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue-demi'
import { useSpotifyApi } from '../utils/spotifyApiComp'
import { ROUTE_SPECIFIC_TRACK } from '../router/index.js'
import { formatDistance } from 'date-fns'
import { de } from 'date-fns/locale'
import UiToggleExpanded from './UiToggleExpanded.vue'
import UiRefreshButton from './UiRefreshButton.vue'
const { spotifyApi } = useSpotifyApi()
const lastTracks = ref([])

const loading = ref(false)
const fetchData = (showLoading) => {
  showLoading && (loading.value = true)
  spotifyApi.getMyRecentlyPlayedTracks({ limit: 10, before: new Date().getTime() })
    .then(response => {
      lastTracks.value = response.items
        .map(item => {
          return {
            orig: item,
            timestamp: new Date(item.played_at),
            dist: formatDistance(new Date(item.played_at), new Date(), { addSuffix: true, locale: de }),
            track: item.track.id,
            artist: Array.isArray(item.track.artists) ? item.track.artists.map(item => item.name).join(', ') : item.track.artists.map(item => item.name),
            song: item.track.name,
            to: {
              name: ROUTE_SPECIFIC_TRACK,
              params: {
                trackId: item.track.id
              }
            }
          }
        })
    })
    .finally(() => {
      showLoading && (loading.value = false)
    })
}

onMounted(() => fetchData())

const showContent = ref(true)
</script>
