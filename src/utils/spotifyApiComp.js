
import SpotifyWebApi from 'spotify-web-api-js'
import { useSpotifyLogIn } from './spotifyAccountComp.js'

import { ref, watch } from 'vue'

/** @type{SpotifyWebApi.SpotifyWebApiJs} */
const spotifyApi = new SpotifyWebApi()
const spotifyLogin = useSpotifyLogIn()
const tokenSet = ref(false)
export const useSpotifyApi = () => {
  watch(() => spotifyLogin.accessToken.value, (newVal) => {
    spotifyApi.setAccessToken(newVal)
    tokenSet.value = !!newVal
  }, { immediate: true })

  return { spotifyApi, tokenSet }
}
