import { ref, watch } from 'vue'
import { useSpotifyLogIn } from './spotifyAccountComp'
import { useSpotifyApi } from './spotifyApiComp'

const spotifyLogin = useSpotifyLogIn()
const { spotifyApi } = useSpotifyApi()
/**
 * @typedef { import("vue").Ref } Ref
 */

/** @type{Ref<SpotifyApi.PlaylistObjectSimplified[]>} */
const allPlaylists = ref([])

const readPlaylists = (offset = 0, limit = 50) => {
  console.log('Lese Playlists ein', { offset, limit })
  if (!offset) {
    allPlaylists.value = []
  }
  const userId = spotifyLogin?.userId?.value
  if (!userId) return undefined
  return spotifyApi.getUserPlaylists(userId, { limit, offset })
    .then(response => {
      const esGibtWeitere = !!response.next
      const playlistsInDiesemFetch = response.items
      allPlaylists.value.push(...playlistsInDiesemFetch)
      const offsetNextCall = offset + playlistsInDiesemFetch.length
      return { esGibtWeitere, offsetNextCall }
    })
    .then(({ esGibtWeitere, offsetNextCall }) => {
      if (esGibtWeitere) {
        return readPlaylists(offsetNextCall)
      } else {
        return Promise.resolve()
      }
    })
}

async function createPlaylist (playlistName, artistName) {
  const userId = spotifyLogin?.userId?.value
  const neuePlaylist = await spotifyApi.createPlaylist(userId, {
    name: playlistName,
    public: false,
    collaborative: false,
    description: `Meine BestOf-Songs${artistName ? ' von ' + artistName : ''}`
  })
  return neuePlaylist
}

const getTargetPlaylist = async (playlistName, artistName) => {
  const playlist = allPlaylists.value.find(item => item.name === playlistName)
  return playlist || await createPlaylist(playlistName, artistName)
}

const songIsAlreadiyInPlaylist = async (playlistId, trackUri) => {
  const tracksInPlaylist = await spotifyApi.getPlaylistTracks(playlistId)
  return !!tracksInPlaylist.items.find(item => item.track.uri === trackUri)
}

const addToPlaylist = async (artistItem, songUri) => {
  const { name, playlistName } = artistItem

  const playlist = await getTargetPlaylist(playlistName, name)

  const playlistId = playlist.id
  const trackUri = songUri.value

  const songIstBereitsEnthalten = await songIsAlreadiyInPlaylist(playlistId, trackUri)

  if (songIstBereitsEnthalten) {
    alert('Track ist bereits in der Playlist')
  } else {
    await spotifyApi.addTracksToPlaylist(playlistId, [trackUri])
    alert('Song ist jetzt in Playlist')
  }
  addToSpecificPlaylist(zaPlaylistId.value, songUri.value)
}

const addToSpecificPlaylist = async (playlistId, songUri) => {
  const songIstBereitsEnthalten = await songIsAlreadiyInPlaylist(playlistId, songUri)

  if (songIstBereitsEnthalten) {
    alert('Track ist bereits in der Playlist')
  } else {
    await spotifyApi.addTracksToPlaylist(playlistId, [songUri])
    alert('Song ist jetzt in Playlist')
  }
}

const zaPlaylistId = ref(null)

watch(() => spotifyLogin?.userId?.value, (userId) => {
  if (userId) {
    readPlaylists()

      .then(() => getTargetPlaylist('za My BestOf-Songs'))
      .then(playlistitem => {
        zaPlaylistId.value = playlistitem.id
      })
  }
}, { immediate: true })

export const useSpotifyPlaylists = () => {
  return {
    getTargetPlaylist, addToPlaylist, readPlaylists, allPlaylists, addToSpecificPlaylist
  }
}
