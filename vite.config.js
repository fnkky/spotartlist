import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

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
      }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
