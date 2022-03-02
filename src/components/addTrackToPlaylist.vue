<template>
  <!-- <v-list-subheader
    class="pb-1"
    style="min-height: unset"
  >
    Song zu bestimmter Playlist hinzufügen
  </v-list-subheader> -->
  <div
    v-if="songUri"
    class="d-flex align-center"
  >
    <select-playlist v-model="playlistToAddTrack" />
    <v-btn
      class="ml-1"
      small
      icon
      flat
      variant="text"
      :disabled="!playlistToAddTrack || !songUri"
      @click="addTrackToPlaylist"
    >
      <v-icon>mdi-database-plus</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSpotifyPlaylists } from '../utils/spotifyPlaylistsComp'
import SelectPlaylist from './selectPlaylist.vue'

const { songUri } = defineProps({
  songUri: {
    type: String,
    required: true
  }
})

const playlistToAddTrack = ref(null)

const addTrackToPlaylist = () => {
  useSpotifyPlaylists().addToSpecificPlaylist(playlistToAddTrack.value, songUri.value)
  playlistToAddTrack.value = null
}

</script>
