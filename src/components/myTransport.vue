<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        cols="12"
        class="d-flex justify-center"
      >
        Player: {{ currentPlaybackState?.device.name }}
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="4"
        class="d-flex justify-center"
      >
        <v-btn
          icon
          @click="previousSong"
        >
          <v-icon>mdi-skip-backward</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        class="d-flex justify-center"
      >
        <v-btn
          icon
          @click="playPause"
        >
          <v-icon v-if="iconPlayPause">
            {{ iconPlayPause }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        class="d-flex justify-center"
      >
        <v-btn
          icon
          @click="nextSong"
        >
          <v-icon>mdi-skip-forward</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useSpotifyTransport } from '../utils/transportComp'

const { nextSong, previousSong, playPause, currentPlaybackState } = useSpotifyTransport()
const iconPlayPause = computed(() => {
  if (!currentPlaybackState.value) return undefined
  return currentPlaybackState.value?.is_playing ? 'mdi-pause' : 'mdi-play'
})
</script>
