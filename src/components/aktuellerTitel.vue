<template>
  <section>
    <h3>Aktueller Titel</h3>
    <article>
      <div style="display: flex">
        <div>
          <h5>{{ songTitle }}</h5>
          <h5>{{ artistsJoined }}</h5>
          <h5>{{ albumName }}</h5>
        </div>

        <img
          :src="albumImageSource"
        >
      </div>
    </article>
    <article>
      <ul>
        <li
          v-for="artistItem in artists"
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
    <article>
      <button @click="readCurrentTrack">
        Aktualisieren
      </button>
    </article>
  </section>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import SpotifyWebApi from 'spotify-web-api-js'
import { computed, inject, onMounted, ref } from 'vue-demi'
import { useUserStore } from '../stores/user'
/** @type{SpotifyWebApi.SpotifyWebApiJs} */
const spotifyApi = inject('spotifyApi')
const userStore = useUserStore()
const titleRaw = ref(null)

const songTitle = computed(() => {
  return titleRaw.value?.item?.name
})

const songUri = computed(() => {
  return titleRaw.value?.item?.uri
})

const albumName = computed(() => {
  return titleRaw.value?.item?.album?.name
})

const albumImageSource = computed(() => {
  return titleRaw.value?.item?.album?.images?.[2]?.url
})

const artists = computed(() => {
  const artistListRaw = titleRaw.value?.item?.artists ?? []
  return artistListRaw.map(item => {
    const { id, name } = item
    const playlistName = `z My Best Of ${name}`
    return { id, name, playlistName }
  })
})

const artistsJoined = computed(() => {
  return titleRaw.value?.item?.artists?.map(artistItem => artistItem.name)?.join(', ')
})

const readCurrentTrack = () => {
  spotifyApi.getMyCurrentPlayingTrack()
    .then(currentTrack => {
      titleRaw.value = currentTrack
    })
}

onMounted(() => {
  readCurrentTrack()
})

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
  const trackUri = songUri.value
  debugger
  const result = await spotifyApi.addTracksToPlaylist(playlistId, [trackUri])

  console.log({ id, name, playlistName, playlist, result })
}

</script>
