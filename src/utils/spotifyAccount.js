import axios from 'axios'
import * as uuid from 'uuid'

const clientId = '1ab55d460fa4444ea2bde381750d3432'
const scope = 'user-read-private user-read-email user-library-modify user-library-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public'
const redirectUrl = 'https://localhost:3000/loginRedirect'

const ACCESSTOKEN_LS_ITEMNAME = 'spotifyAccessToken'
const STATE_LS_ITEMNAME = 'stateTokenForLogin'

export const spotifyLoginDelegate = () => {
  const state = location.hash ? encodeURI(location.hash) : uuid.v4().substring(0, 16)
  localStorage.setItem(STATE_LS_ITEMNAME, state)
  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(clientId)
  url += '&scope=' + encodeURIComponent(scope)
  url += '&redirect_uri=' + encodeURIComponent(redirectUrl)
  url += '&state=' + encodeURIComponent(state)

  window.location = url
}

const setAxiosDefaultAuth = () => {
  const token = localStorage.getItem(ACCESSTOKEN_LS_ITEMNAME)

  axios.defaults.headers.Authorization = token ? `Bearer ${token}` : undefined
}

export const logInRouteGuardDelegate = () => {
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
    resolve(true)
  })
}

setAxiosDefaultAuth(

)
