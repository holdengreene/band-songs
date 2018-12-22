<template>
  <li class="song-item">
    <div class="song-info">
      <h3>{{ song.title }}</h3>
      <p class="chords">Chords: <span class="chords--span">{{ getChords }}</span></p>
    </div>
    <div class="song-buttons">
      <nuxt-link :to="song.id.toString()">View Song</nuxt-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    getChords: function() {
      // Convert the chords from an array to a string
      return this.song.chords.join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
.song-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: rem(1px) solid $border-light;
  margin: rem(20px) 0;
}

.chords--span {
  color: $strange-pink;
  font-weight: 700;
}
</style>

