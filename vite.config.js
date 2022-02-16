import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spotartlist/',
  server: {
    https: true,
    host: true
  },
  plugins: [
    VitePWA({
      manifest: {

        // content of manifest
        share_target: {
          action: '/share-target/',
          method: 'GET',
          params: {
            title: 'SpotArtList',
            text: 'Setze  den Song auf meine ArtistBestof-Playlst',
            url: 'url'
          }
        }
      },
      workbox: {
        // workbox options for generateSW
      }
    }),
    vue()]
})
