<template>
  <div>
    <div class="useful-text">
      <h1>Band Songs</h1>
      <h2>Track The Songs</h2>
      <p>Stop forgetting what songs you know.</p>
    </div>
    <div class="song-section" v-if="songsList">
      <h2>All The Songs</h2>
      <ul class="song-list">
        <SongItem v-for="song in songsList" :key="song.id" :song="song"/>
      </ul>
    </div>
  </div>
</template>

<script>
import SongItem from '~/components/SongItem.vue';
import axios from 'axios';

export default {
  components: {
    SongItem
  },
  async asyncData() {
    const allSongs = `http://localhost:8080/bands/1/songs`;

    try {
      const {
        data: { songs }
      } = await axios.get(allSongs);

      if (!songs.length > 0) {
        return { songsEmpty: true };
      }

      return { songsList: songs };
    } catch (e) {
      return { songsEmpty: true };
    }
  }
};
</script>

<style lang="scss" scoped>
.song-section {
  background-color: $off-white;
  padding: rem(10px);
  border: rem(1px) solid $border-dark;
}

.song-list {
  list-style: none;
  padding: 0 rem(25px);
}
</style>

