<template>
  <div class="d-flex align-baseline">
    <label
      for="playlistSelect"
      class="mr-2"
    >Playlist</label>
    <select
      id="playlistSelect"
      v-model="selectedId"
      style="border: 1px solid"
      class="px-2 py-1 w-full"
      placeholder="asdf"
    >
      <option
        v-for="playlist in playlistsNames"
        :key="playlist.id"
        :value="playlist.id"
      >
        {{ playlist.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from '@vue/runtime-core'
import { useSpotifyPlaylists } from '../utils/spotifyPlaylistsComp'
const playlists = useSpotifyPlaylists()
const playlistsNames = computed(() => {
  const ret = playlists.allPlaylists.value?.map(item => { return { name: item.name, id: item.id, uri: item.uri } }) 
  ret.sort((a, b) => {
    return a.name > b.name ? 1 : -1
  })
  return ret
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const selectedId = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emit('update:modelValue', val)
  }
})

</script>
