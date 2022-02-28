import { ref } from 'vue'
import { useSpotifyApi } from './spotifyApiComp'
const { spotifyApi } = useSpotifyApi()

const currentPlaybackState = ref(null)

const refreshPlaybackState = () => {
  spotifyApi.getMyCurrentPlaybackState()
    .then(response => {
      currentPlaybackState.value = response
    })
}

refreshPlaybackState()
setInterval(() => refreshPlaybackState(), 3000)

export const useSpotifyTransport = () => {
  const nextSong = () => {
    spotifyApi.skipToNext()
  }

  const previousSong = () => {
    spotifyApi.skipToPrevious()
  }

  const playPause = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then(response => {
        if (response.is_playing) {
          spotifyApi.pause().then(() => refreshPlaybackState())
        } else {
          spotifyApi.play().then(() => refreshPlaybackState())
        }
      })
  }

  return { nextSong, previousSong, playPause, currentPlaybackState }
}
