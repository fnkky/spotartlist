<template>
  <section v-if="!!trackId">
    singleTrack mit der ID {{ trackId }}
    <article>
      <div style="display: flex">
        <div>
          <h5>{{ spotifyTrack?.songTitle.value }}</h5>
          <h5>{{ spotifyTrack?.artistsJoined.value }}</h5>
          <h5>{{ spotifyTrack?.albumName.value }}</h5>
        </div>

        <img
          :src="spotifyTrack?.albumImageSource.value"
        >
      </div>
    </article>
    <article>
      <ul>
        <li
          v-for="artistItem in spotifyTrack?.artists.value"
          :key="artistItem.id"
          style="margin-top: 0.25rem"
        >
          <button
            style="padding: 0.25rem"
            @click="addToPlaylist(artistItem)"
          >
            In Playlist "{{ artistItem.playlistName }}" aufnehmen
          </button>
        </li>
      </ul>
    </article>
  </section>
  <div
    v-else
    class="p-5 text-cyan-200 font-bold bg-gradient-to-tl from-stone-500 via-slate-500 to-neutral-600"
  >
    Keine TrackId für Anzeige
  </div>
</template>

<script setup>

import { inject, watch, defineProps } from 'vue'
// eslint-disable-next-line no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'

import { useSpotifyTrack } from '../utils/spotifyTrack.js'
import { useSpotifyApi } from '../utils/spotifyApiComp.js'

const { spotifyApi } = useSpotifyApi()

const props = defineProps({
  trackId: {
    type: String,
    required: true
  }
})

const spotifyTrack = useSpotifyTrack()

watch(() => props.trackId, (newVal) => {
  spotifyTrack.setTrackid(newVal)
}, { immediate: true })

const getTargetPlaylist = async (playlistName, artistName) => {
  /** @type{SpotifyWebApi.SpotifyWebApiJs.} */
  let gefunden = null
  const limit = 50
  let offset = 0
  let esGibtWeitere = true
  while (esGibtWeitere && !gefunden) {
    const response = await spotifyApi.getUserPlaylists(userStore.userId, { limit, offset })

    esGibtWeitere = !!response.next
    const playlistsInDiesemFetch = response.items
    offset += playlistsInDiesemFetch.length

    gefunden = playlistsInDiesemFetch.find(playlist => playlist.name === playlistName)
  }

  if (!gefunden) {
    const neuePlaylist = await spotifyApi.createPlaylist(userStore.userId, {
      name: playlistName,
      public: false,
      collaborative: false,
      description: `Meine BestOf-Songs von ${artistName}`
    })
    return neuePlaylist
  }

  return gefunden
}

const addToPlaylist = async (artistItem) => {
  const { id, name, playlistName } = artistItem

  const playlist = await getTargetPlaylist(playlistName, name)

  const playlistId = playlist.id
  const trackUri = spotifyTrack.songUri.value

  const result = await spotifyApi.addTracksToPlaylist(playlistId, [trackUri])

  console.log({ id, name, playlistName, playlist, result })
}

</script>
