<template>
  <single-track :track-id="props.trackId" />
</template>

<script setup>
import SingleTrack from '../components/singleTrack.vue'

// eslint-disable-next-line no-undef
const props = defineProps({
  trackId: {
    type: String,
    default: null
  }
})

</script>
