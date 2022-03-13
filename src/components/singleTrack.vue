<template>
  <div
    v-if="!!trackId"
    class="card w-11/12 glass m-auto mt-2"
  >
    <figure class="pa-2">
      <img
        :src="spotifyTrack?.albumImageSource.value"
        alt="Alumbcover des aktuellen Tracks"
        style="height: 25vh;"
      >
    </figure>
    <div class="card-body pt-2 pb-3">
      <h2 class="card-title justify-center flex flex-col">
        <span>{{ spotifyTrack?.songTitle.value }}</span>
        <p>
          {{ spotifyTrack?.artistsJoined.value }}
        </p>
      </h2>

      <hr>

      <div class="card-actions justify-end">
        <div class="flex flex-column">
          <ul>
            <li
              v-for="artistItem in spotifyTrack?.artists.value"
              :key="artistItem.id"
              style="margin-top: 0.25rem"
            >
              <button
                class="btn btn-outline btn-accent"
                @click="spotifyPlaylistManager.addToPlaylist(artistItem, spotifyTrack.songUri)"
              >
                <v-icon>mdi-playlist-plus</v-icon>
                "{{ artistItem.playlistName }}"
              </button>
            </li>
          </ul>
        </div>

        <add-track-to-playlist
          :song-uri="spotifyTrack.songUri"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { watch, defineProps } from 'vue'

import { useSpotifyTrack } from '../utils/spotifyTrack.js'

import { useSpotifyPlaylists } from '../utils/spotifyPlaylistsComp.js'
import AddTrackToPlaylist from './addTrackToPlaylist.vue'
import { useRoute } from 'vue-router'
const spotifyPlaylistManager = useSpotifyPlaylists()

const route = useRoute()

const props = defineProps({
  trackId: {
    type: String,
    required: true
  }
})

const spotifyTrack = useSpotifyTrack()

watch(() => props.trackId, (newVal) => {
  spotifyTrack.setTrackid(newVal)
}, { immediate: true })

</script>
