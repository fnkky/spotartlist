<template>
  <v-card
    v-if="!!trackId"
    border
  >
    <v-img
      :src="spotifyTrack?.albumImageSource.value"
    />
    <div class="d-flex">
      <v-card-subtitle style="flex-grow: 5">
        {{ spotifyTrack?.artistsJoined.value }}
      </v-card-subtitle>
      <v-card-title style="flex-grow: 8">
        {{ spotifyTrack?.songTitle.value }}
      </v-card-title>
    </div>
    <v-divider />

    <ul>
      <li
        v-for="artistItem in spotifyTrack?.artists.value"
        :key="artistItem.id"
        style="margin-top: 0.25rem"
      >
        <v-btn
          outlined
          color="blue"
          variant="text"
          block
          @click="spotifyPlaylistManager.addToPlaylist(artistItem, spotifyTrack.songUri)"
        >
          <v-icon>mdi-playlist-plus</v-icon>
          "{{ artistItem.playlistName }}"
        </v-btn>
      </li>
    </ul>
    <div class="pa-2">
      <add-track-to-playlist
        :song-uri="spotifyTrack.songUri"
      />
    </div>
  </v-card>

  <div
    v-else
    class="p-5 text-cyan-200 font-bold bg-gradient-to-tl from-stone-500 via-slate-500 to-neutral-600"
  >
    Keine TrackId für Anzeige
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
