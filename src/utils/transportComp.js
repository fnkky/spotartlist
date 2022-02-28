import { useSpotifyApi } from './spotifyApiComp'
const { spotifyApi } = useSpotifyApi()

export const useSpotifyTransport = () => {
  const nextSong = () => {
    spotifyApi.skipToNext()
  }

  const previousSong = () => {
    spotifyApi.skipToPrevious()
  }

  return { nextSong, previousSong }
}
