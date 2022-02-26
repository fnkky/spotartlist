<template>
  <section>
    <h3>
      Aktueller Titel

      <button
        class="btn btn-sm"
        @click="readCurrentTrack"
      >
        refr.
      </button>
    </h3>
  </section>
  <hr>
  <section>
    <SingleTrack
      v-if="trackId"
      :track-id="trackId"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
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

onMounted(() => {
  readCurrentTrack()
})

</script>
