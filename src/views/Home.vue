<script setup>
import { computed } from 'vue-demi'
import { useUserStore } from '../stores/user'
import AktuellerTitel from '../components/aktuellerTitel.vue'

const userStore = useUserStore()
const userAngemeldet = computed(() => !!userStore.profile)
</script>
<template>
  <div v-if="userAngemeldet">
    <AktuellerTitel />
  </div>
</template>
