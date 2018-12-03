<template>
  <div v-if="typeof song !== 'undefined'">
    <h1>{{ song.title }}</h1>
    <p>{{ song.chords }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    try {
      const songsJson = `http://localhost:3000/songs.json`
      const { data } = await axios.get(songsJson)
      const selectedSong = data[params.song]

      if (!selectedSong) {
        throw new Error('Song Undefined')
      }

      return { song: selectedSong }
    } catch (e) {
      throw new Error(e)
    }
  }
}
</script>
