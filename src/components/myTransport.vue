<template>
  <div class="flex justify-around w-full bg-gray-700 px-2 py-3">
    Player: {{ currentPlaybackState?.device?.name }}
    <button
      icon
      @click="previousSong"
    >
      <v-icon>mdi-skip-backward</v-icon>
    </button>
    <button
      icon
      @click="playPause"
    >
      <v-icon v-if="iconPlayPause">
        {{ iconPlayPause }}
      </v-icon>
    </button>
    <button
      icon
      @click="nextSong"
    >
      <v-icon>mdi-skip-forward</v-icon>
    </button>
  </div>
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
