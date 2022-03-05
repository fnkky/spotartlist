import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import './index.css'
import './utils/spotifyPlaylistsComp'
import '../node_modules/izitoast/dist/css/iziToast.min.css'
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
