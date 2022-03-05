<template>
  <div
    v-if="songUri"
    class="d-flex align-center"
  >
    <select-playlist v-model="playlistToAddTrack" />
    <button
      class="btn btn-accent ml-auto"
      :disabled="!playlistToAddTrack || !songUri"
      @click="addTrackToPlaylist"
    >
      <svg

        style="width:24px;height:24px"
        viewBox="0 0 24 24"
      >
        <path
          class="btn-accent"
          fill="accent"
          d="M2,16H10V14H2M18,14V10H16V14H12V16H16V20H18V16H22V14M14,6H2V8H14M14,10H2V12H14V10Z"
        />
      </svg>
    </button>
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
