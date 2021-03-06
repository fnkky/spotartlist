<template>
  <select
    id="playlistSelect"
    v-model="selectedId"
    class="select select-accent text-accent w-4/5"
  >
    <option
      value=""
      selected
    >
      {{ props.placeholder }}
    </option>
    <option
      v-for="playlist in playlistsNames"
      :key="playlist.id"
      :value="playlist.id"
      :disabled="playlist.disabled"
    >
      {{ playlist.name }}
    </option>
  </select>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useSpotifyPlaylists } from '../utils/spotifyPlaylistsComp'
import { useRememberPlaylists } from '../utils/spotifyRememberPlaylists'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  showLastUsedPlaylistsFirst: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Playlist auswählen '
  }
})

const playlists = useSpotifyPlaylists()

const reorderLastUsedToBeginInLine = (/** @type{Array} */ list) => {
  const lastPlaylistIds = useRememberPlaylists().lastPlaylistsIds

  if (!lastPlaylistIds.value.length) return undefined
  list.splice(0, 0, { name: '--------------------', id: '------------', uri: undefined, disabled: true })

  for (let i = lastPlaylistIds.value.length - 1; i >= 0; i--) {
    const searchId = lastPlaylistIds.value[i]
    const indexInAllLists = list.findIndex(item => item.id === searchId)
    if (indexInAllLists >= 0) {
      const toMove = list.splice(indexInAllLists, 1)
      list.splice(0, 0, toMove[0])
    }
  }

  list.splice(0, 0, { name: '--------- Zuletzt genutzt ---------', id: '------------', uri: undefined, disabled: true })
}

const playlistsNames = computed(() => {
  const ret = playlists.allPlaylists.value?.map(item => { return { name: item.name, id: item.id, uri: item.uri } })
  ret.sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  })

  if (props.showLastUsedPlaylistsFirst) reorderLastUsedToBeginInLine(ret)

  return ret
})

const emit = defineEmits(['update:modelValue'])

const selectedId = computed({
  get () {
    return props.modelValue || ''
  },
  set (val) {
    emit('update:modelValue', val)
  }
})

</script>
