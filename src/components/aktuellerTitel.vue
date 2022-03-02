<template>
  <!-- <v-app-bar flat>
    Modus: aktueller Titel

    <v-btn
      icon
      flat
      @click="readCurrentTrack"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-app-bar> -->
  <v-card flat>
    <v-card-title class="py-1" />
    <v-card-text class="pa-0" />
  </v-card>
  <SingleTrack
    v-if="trackId"
    :track-id="trackId"
  />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSpotifyApi } from '../utils/spotifyApiComp'
import SingleTrack from './singleTrack.vue'

const spotifyApi = useSpotifyApi().spotifyApi

const titleRaw = ref(null)

const trackId = computed(() => {
  return titleRaw.value?.item?.id
})

const readCurrentTrack = () => {
  if (!spotifyApi) return undefined
  spotifyApi.getMyCurrentPlayingTrack()
    .then(currentTrack => {
      titleRaw.value = currentTrack
    })
}

const intervalId = ref(null)
intervalId.value = setInterval(() => readCurrentTrack(), 2500)

onUnmounted(() => {
  clearInterval(intervalId.value)
  intervalId.value = null
})

onMounted(() => {
  readCurrentTrack()
})

</script>
