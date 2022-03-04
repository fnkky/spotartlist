<template>
  <div
    v-if="!!trackId"
    class="card w-11/12 glass m-auto mt-5"
  >
    <figure>
      <img
        :src="spotifyTrack?.albumImageSource.value"
        alt="Alumbcover des aktuellen Tracks"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ spotifyTrack?.songTitle.value }}
      </h2>
      <p>{{ spotifyTrack?.artistsJoined.value }}</p>
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

import { watch, defineProps, ref } from 'vue'

import { useSpotifyTrack } from '../utils/spotifyTrack.js'

import { useSpotifyPlaylists } from '../utils/spotifyPlaylistsComp.js'
import SelectPlaylist from './selectPlaylist.vue'
import AddTrackToPlaylist from './addTrackToPlaylist.vue'
const spotifyPlaylistManager = useSpotifyPlaylists()

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

const showAddToPlaylistExpands = ref(true)
</script>
