import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.provide('spotifyApi', spotifyApi)
app.mount('#app')
