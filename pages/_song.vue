<template>
  <div class="song-wrap">
    <!-- <h1>{{ getSong.title }}</h1> -->
    {{ getCurrSong }}
    <nuxt-link to="168">Hello</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    getCurrSong: function() {
      // Have to convert the id to a number
      const songId = parseInt(this.$route.params.song);
      return this.$store.getters.getSongById(songId);
    }
  }
};
</script>
