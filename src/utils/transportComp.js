import { useSpotifyApi } from './spotifyApiComp'
const { spotifyApi } = useSpotifyApi()

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
          spotifyApi.pause()
        } else {
          spotifyApi.play()
        }
      })
  }

  return { nextSong, previousSong, playPause }
}
