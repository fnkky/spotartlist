import axios from 'axios'
import * as uuid from 'uuid'
import { onMounted, readonly, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const clientId = '1ab55d460fa4444ea2bde381750d3432'
// const scope = 'user-read-private user-library-modify user-library-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public'
const scope = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public'

const redirectUrl1 = `${location.href}`.substring(0, `${location.href}`.length - 1)

const ACCESSTOKEN_LS_ITEMNAME = 'spotifyAccessToken'
const STATE_LS_ITEMNAME = 'stateTokenForLogin'

const getAccessToken = () => {
  return localStorage.getItem(ACCESSTOKEN_LS_ITEMNAME)
}
const forceLogedInState = () => {
  // Wenn es keinen Token gibt -> Anmelden
  return new Promise((resolve, reject) => {
    if (!getAccessToken()) {
      console.log('Es gibt keinen AccessToken im LS -> starte Login-Prozedur')
      spotifyLoginDelegate()
      resolve(false)
    }

    axios.get('https://api.spotify.com/v1/me')
      .then((response) => {
        resolve({ profile: response.data, accessToken: getAccessToken() })
      })
      .catch(e => {
        console.log('Procile wurde nicht geladen, starte Login-Prozedur')
        spotifyLoginDelegate()
        resolve(false)
      })
  })
}

const spotifyLoginDelegate = async () => {
  const state = location.hash ? encodeURI(location.hash) : uuid.v4().substring(0, 16)
  localStorage.setItem(STATE_LS_ITEMNAME, state)
  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&redirect_uri=' + encodeURIComponent(redirectUrl1)
  url += '&state=' + encodeURIComponent(state)
  url += '&client_id=' + encodeURIComponent(clientId)
  url += '&scope=' + encodeURIComponent(scope)

  window.location = url
}

const setAxiosDefaultAuth = () => {
  const token = localStorage.getItem(ACCESSTOKEN_LS_ITEMNAME)

  axios.defaults.headers.Authorization = token ? `Bearer ${token}` : undefined
}

const logInRouteGuardDelegate = () => {
  const router = useRouter()
  const route = useRoute()
  return new Promise((resolve, reject) => {
    let hash = location.hash
    if (hash.startsWith('#')) hash = hash.substring(1)

    // Hash-Values in Map einlesen
    const hashValues = hash.split('&').reduce((acc, current) => {
      const [key, value] = current.split('=')
      acc[key] = value
      return acc
    }, {})

    // eslint-disable-next-line camelcase
    const { access_token, state } = hashValues
    const expectedState = localStorage.getItem(STATE_LS_ITEMNAME)
    if (state !== expectedState) reject(new Error('State passt nicht', { state, expectedState }))

    localStorage.setItem(ACCESSTOKEN_LS_ITEMNAME, access_token)
    setAxiosDefaultAuth()

    if (route) {
      const newRoute = JSON.parse(JSON.stringify(route))
      delete newRoute.hash
      router.replace(newRoute)
        .then(() => (resolve(true)))
    }
  })
}

setAxiosDefaultAuth()

const spotifyUserProfile = ref(null)
const loginTried = ref(false)
const loginError = ref(null)
const accessToken = ref(null)

export const useSpotifyLogIn = () => {
  if (!spotifyUserProfile.value) {
    // auf der Login-Seite nichts machen
    if (location.hash.toLowerCase().indexOf('access_token') >= 0) {
      logInRouteGuardDelegate()
    }

    // Wenn es keinen Token gibt -> anmeldeversuch starten
    forceLogedInState()
      .then(result => {
        spotifyUserProfile.value = result.profile
        accessToken.value = result.accessToken
      })
      .then(() => (loginTried.value = true))
      .catch(e => (loginError.value = e))
  }

  return {
    spotifyUserProfile: readonly(spotifyUserProfile),
    accessToken: readonly(accessToken)
  }
}
