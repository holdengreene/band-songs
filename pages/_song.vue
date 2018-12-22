<template>
  <div class="song-wrap">
    <!-- <h1>{{ getSong.title }}</h1> -->
    {{ currSong }}
    <nuxt-link to="168">Hello</nuxt-link>
  </div>
</template>

<script>
export default {
  // Add current song to data on page load
  async asyncData({ params, store }) {
    const songId = parseInt(params.song);

    const currSong = store.getters.getSongById(songId);

    return { currSong };
  },
  // Get the current song from vuex at any time
  computed: {
    getSong: function() {
      // Have to convert the id to a number
      const songId = parseInt(this.$route.params.song);
      return this.$store.getters.getSongById(songId);
    }
  }
};
</script>
