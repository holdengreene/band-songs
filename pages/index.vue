<template>
  <div>
    <div class="top-section">
      <h1>All Songs</h1>
      <input class="song-search" type="text" placeholder="Search Song Titles" v-model="search">
    </div>
    <div class="song-section" v-if="getSongs">
      <ul class="song-list">
        <SongItem v-for="song in getSongs" :key="song.id" :song="song"/>
      </ul>
    </div>
  </div>
</template>

<script>
import SongItem from '~/components/SongItem.vue';
import { apiUrl } from '~/assets/js/siteDefinitions';
import axios from 'axios';

export default {
  components: {
    SongItem
  },
  data() {
    return {
      songsList: {},
      search: ''
    };
  },
  async asyncData() {
    const allSongs = `${apiUrl}/bands/1/songs`;

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
.top-section {
  display: flex;
  justify-content: space-between;
  margin: rem(50px) 0;
}

.song-search {
  width: 40%;
  padding: rem(10px);
  border-radius: rem(3px);
  border: 0 transparent solid;
  box-shadow: 0 rem(1px) rem(3px) rgba(0, 0, 0, 0.12),
    0 rem(1px) rem(2px) rgba(0, 0, 0, 0.24);
}

.song-section {
  background-color: #fff;
  padding: rem(10px);
  border-radius: rem(3px);
  box-shadow: 0 rem(1px) rem(3px) rgba(0, 0, 0, 0.12),
    0 rem(1px) rem(2px) rgba(0, 0, 0, 0.24);
}

.song-list {
  list-style: none;
  padding: 0 rem(25px);
}
</style>

