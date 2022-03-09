<template>
  <div
    class="dropdown dropdown-end"
    @click="fetchData"
  >
    <label
      tabindex="0"
      class="btn m-1 btn-ghost"
    >zuletzt gehört</label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-96 overflow-scroll h-96"
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
</template>

<script setup>
import { ref } from 'vue-demi'
import { useSpotifyApi } from '../utils/spotifyApiComp'
import { ROUTE_SPECIFIC_TRACK } from '../router/index.js'
import { formatDistance } from 'date-fns'
import { de } from 'date-fns/locale'
const { spotifyApi } = useSpotifyApi()
const lastTracks = ref([])

const fetchData = () => {
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
}
</script>
