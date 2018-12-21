<template>
  <div>
    <div class="useful-text">
      <h1>Band Songs</h1>
      <h2>Track The Songs</h2>
      <p>Stop forgetting what songs you know.</p>
    </div>

    <div class="song-grid">
      <SongCard v-for="(song, index) in getSongs" :key="index" :song="song"/>
    </div>

    <button type="button" @click="changeOffset()">Next</button>
    <!-- {{ songsList }} -->
  </div>
</template>

<script>
import SongCard from '~/components/SongCard.vue';

export default {
  components: {
    SongCard
  },
  async fetch({ store }) {
    try {
      await store.dispatch('fetchSongs');
      // Just pass the songs to the store
      // store.commit('setSongs', data.songs);
    } catch (e) {
      throw new Error(e);
    }
  },
  computed: {
    getSongs: function() {
      return this.$store.state.songsList.songs;
    }
  },
  methods: {
    changeOffset: function() {
      console.log("hello");
      return this.$store.commit('incrementOffset', 20);
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

