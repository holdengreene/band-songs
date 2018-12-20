<template>
  <div>
    <div class="useful-text">
      <h1>Band Songs</h1>
      <h2>Track The Songs</h2>
      <p>Stop forgetting what songs you know.</p>
    </div>

    <div class="song-grid">
      <SongCard v-for="song in songs" :key="song.id" :song="song"/>
    </div>
  </div>
</template>

<script>
import SongCard from '~/components/SongCard.vue';
import axios from 'axios';

export default {
  components: {
    SongCard
  },
  async asyncData() {
    try {
      const songsJson = `http://localhost:3000/songs.json`;
      const { data } = await axios.get(songsJson);

      return { songs: data };
    } catch (e) {
      throw new Error(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.song-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .card {
    margin: rem(5px);
    width: calc(25% - #{rem(10px)});
  }
}

@supports (display: grid) {
  .song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(rem(270px), 1fr));
    grid-gap: rem(10px);

    .card {
      margin: 0;
      width: 100%;
    }
  }
}

@media screen and (max-width: rem(1023px)) {
  .song-grid .card {
    width: calc(50% - #{rem(10px)});
  }

  @supports (display: grid) {
    .song-grid {
      .card {
        width: 100%;
      }
    }
  }
}
</style>

