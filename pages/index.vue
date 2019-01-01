<template>
  <div>
    <div class="top-section">
      <h1>All Songs</h1>
    </div>
    <ContentHolder class="song-section" v-if="getSongs">
      <div class="search-section">
        <input class="song-search" type="text" placeholder="Search Song Titles" v-model="search">
        <!-- Doesn't actually do anything except allow search data to update on mobile -->
        <button type="button" class="btn btn--outline">Search</button>
      </div>

      <ul class="song-list">
        <SongItem v-for="song in getSongs" :key="song.id" :song="song"/>
      </ul>
    </ContentHolder>
  </div>
</template>

<script>
import SongItem from '~/components/SongItem.vue';
import ContentHolder from '~/components/ContentHolder.vue';
import { apiUrl } from '~/assets/js/siteDefinitions';
import axios from 'axios';

export default {
  components: {
    SongItem,
    ContentHolder
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
.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.song-search {
  padding: rem(10px);
  margin: rem(10px) rem(25px);
  border-radius: rem(3px);
  border: 0 transparent solid;
  box-shadow: $box-shadow;
}

.song-list {
  list-style: none;
  padding: 0 rem(25px);
}

@media screen and (min-width: $main-break) {
  .song-search {
    width: 40%;
  }
}
</style>

