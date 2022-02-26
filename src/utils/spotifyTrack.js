import { computed, ref, watch } from 'vue'
// eslint-disable-next-line no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'

import { useSpotifyApi } from './spotifyApiComp.js'
const { spotifyApi } = useSpotifyApi()
export function useSpotifyTrack () {
  /** @type{SpotifyApi.SingleTrackResponse} */
  const titleRaw = ref(null)

  const trackId = ref(null)

  const fetchTrack = () => {
    if (!trackId.value) {
      titleRaw.value = null
      return undefined
    }
    spotifyApi.getTrack(trackId.value).then(result => {
      titleRaw.value = result
    })
  }

  watch(() => trackId.value, (newTrackid) => {
    fetchTrack()
  }, { immediate: true })

  const setTrackid = (val) => {
    trackId.value = val
  }

  const songTitle = computed(() => {
    return titleRaw.value?.name
  })

  const songUri = computed(() => {
    return titleRaw.value?.uri
  })

  const albumName = computed(() => {
    return titleRaw.value?.album?.name
  })

  const albumImageSource = computed(() => {
    return titleRaw.value?.album?.images?.[2]?.url
  })

  const artists = computed(() => {
    const artistListRaw = titleRaw.value?.artists ?? []
    return artistListRaw.map(item => {
      const { id, name } = item
      const playlistName = `z My Best Of ${name}`
      return { id, name, playlistName }
    })
  })

  const artistsJoined = computed(() => {
    return titleRaw.value?.artists?.map(artistItem => artistItem.name)?.join(', ')
  })

  return { setTrackid, titleRaw, songTitle, artists, songUri, albumImageSource, albumName, artistsJoined }
}
