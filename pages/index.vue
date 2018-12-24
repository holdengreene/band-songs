<template>
  <div>
    <div class="useful-text">
      <h1>All Songs</h1>
      <input type="text" placeholder="Search" v-model="search">
    </div>
    <div class="song-section" v-if="getSongs">
      <h2>All The Songs</h2>
      <ul class="song-list">
        <SongItem v-for="song in getSongs" :key="song.id" :song="song"/>
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
  data() {
    return {
      search: ''
    };
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
  },
  computed: {
    getSongs: function() {
      if (this.search) {
        return this.songsList.filter(song =>
          song.title.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return this.songsList;
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

