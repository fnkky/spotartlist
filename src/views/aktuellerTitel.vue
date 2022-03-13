<template>
  <div class="bg-slate-700 pb-4 rounded-b-sm mt-2">
    <div class="flex align-center justify-evenly">
      <!-- <button
        class="btn btn-sm btn-ghost"
        @click="showContent = !showContent"
      >
        <svg
          v-if="showContent"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> -->
      <ui-toggle-expanded v-model="showContent" />

      <h2 class="pt-2 pb-3 font-bold text-lg flex flex-grow justify-center text-primary">
        Aktueller Titel
      </h2>
      <ui-refresh-button
        :loading="loading"
        :hide="!showContent"
        @pressed="readCurrentTrack(true)"
      />
      <!-- <button
        v-show="showContent"
        class="btn btn-sm btn-ghost"
        :class="{loading: loading}"
        @click="readCurrentTrack(true)"
      >
        <svg
          v-if="!loading"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button> -->
    </div>
    <transition>
      <SingleTrack
        v-if="trackId && showContent"
        id="singleTrackOnCurrent"
        :track-id="trackId"
      />
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useSpotifyApi } from '../utils/spotifyApiComp'
import SingleTrack from '../components/singleTrack.vue'
import UiToggleExpanded from '../components/UiToggleExpanded.vue'
import UiRefreshButton from '../components/UiRefreshButton.vue'

const spotifyApi = useSpotifyApi().spotifyApi

const titleRaw = ref(null)

const trackId = computed(() => {
  return titleRaw.value?.item?.id
})

const loading = ref(false)
const readCurrentTrack = (showLoader = false) => {
  if (!spotifyApi) return undefined
  showLoader && (loading.value = true)
  spotifyApi.getMyCurrentPlayingTrack()
    .then(currentTrack => {
      titleRaw.value = currentTrack
    })
    .finally(() => (showLoader && (loading.value = false)))
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

const showContent = ref(true)

</script>
