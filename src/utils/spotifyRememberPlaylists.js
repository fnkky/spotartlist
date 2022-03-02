import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useSpotifyPlaylists } from './spotifyPlaylistsComp'

const lastPlaylistsIds = useLocalStorage('lastPlaylists', [])
const MAX_ENTRIES = 10
export const useRememberPlaylists = () => {
  const addPlaylistToList = (playlistId) => {
    // TODO: 1) Groessenbeschränkung  2) Wenn schon vorhanden, dann in Liste nach oben

    const bereitsVorhandenAufIndex = lastPlaylistsIds.value.findIndex(item => item === playlistId)
    if (bereitsVorhandenAufIndex > -1) {
      const swap = lastPlaylistsIds.value.splice(bereitsVorhandenAufIndex, 0)
      lastPlaylistsIds.value.splice(0, 0, swap[0])
      return undefined
    }

    lastPlaylistsIds.value.splice(0, 0, playlistId)
    if (lastPlaylistsIds.value.length > MAX_ENTRIES) {
      lastPlaylistsIds.value.length = 10
    }
  }

  const playListsExtended = computed(() => lastPlaylistsIds.value
    .map(playlistId => {
      const pl = useSpotifyPlaylists().allPlaylists.value.find(item => item.id === playlistId)
      if (!pl) return undefined
      const { id, name } = pl
      return { id, name }
    })
    .filter(i => !!i)
  )

  return { addPlaylistToList, playListsExtended, lastPlaylistsIds }
}
