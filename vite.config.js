import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    host: true
  },
  plugins: [
    vue(),
    VitePWA(
      {
        mode: 'development',
        base: '/',
        includeAssets: ['favicon.ico'],
        manifest: {
          name: 'SpotArtList',
          short_name: 'SpotArtList',
          theme_color: '#ffffff',
          share_target: {
            action: '/share-target/',
            method: 'GET',
            params: {
              title: 'SpotArtList',
              text: 'Setze  den Song auf meine ArtistBestof-Playlst',
              url: 'url'
            }
          },
          icons: [
            {
              src: 'pwa-192x192.png', // <== don't add slash, for testing
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png', // <== don't remove slash, for testing
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png', // <== don't add slash, for testing
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        },
        devOptions: {
          enabled: process.env.SW_DEV === 'true',
          /* when using generateSW the PWA plugin will switch to classic */
          type: 'module',
          navigateFallback: 'index.html'
        }
      }
    )
  ]
})
