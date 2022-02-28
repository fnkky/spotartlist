<template>
  <v-card v-if="!!trackId">
    <v-card-title>
      {{ spotifyTrack?.songTitle.value }}
    </v-card-title>
    <v-card-subtitle> {{ spotifyTrack?.artistsJoined.value }}</v-card-subtitle>
    <v-img
      :src="spotifyTrack?.albumImageSource.value"
      height="30vh"
    /><v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        :class="cursor-pointer"
        @click="showAddToPlaylistExpands = !showAddToPlaylistExpands"
      >
        In Playlists aufnehmen
      </v-btn>

      <v-spacer />

      <v-btn
        :icon="showAddToPlaylistExpands ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showAddToPlaylistExpands = !showAddToPlaylistExpands"
      />
    </v-card-actions>

    <v-expand-transition>
      <div
        v-if="showAddToPlaylistExpands"
        class="px-2 pb-3"
      >
        <v-divider />

        <ul>
          <li
            v-for="artistItem in spotifyTrack?.artists.value"
            :key="artistItem.id"
            style="margin-top: 0.25rem"
          >
            <v-btn
              color="primary"
              block
              @click="spotifyPlaylistManager.addToPlaylist(artistItem, spotifyTrack.songUri)"
            >
              {{ artistItem.playlistName }}
            </v-btn>
          </li>
        </ul>
        <v-divider />
        <v-list-subheader>Song zu Playlist hinzufügen</v-list-subheader>
        <div class="d-flex align-baseline">
          <select-playlist v-model="playlistToAddTrack" />
          <v-btn
            small
            icon
            flat
            @click="addTrackToPlaylist"
          >
            <v-icon>mdi-database-plus</v-icon>
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
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

const addTrackToPlaylist = () => {
  spotifyPlaylistManager.addToSpecificPlaylist(playlistToAddTrack.value, spotifyTrack.songUri.value)
}

const showAddToPlaylistExpands = ref(true)
const playlistToAddTrack = ref(null)
</script>
