<template>
  <li class="song-item">
    <div class="song-info">
      <h3>{{ song.title }}</h3>
      <p class="chords">
        <span class="chords--span">Chords:</span>
        {{ getChords }}
      </p>
    </div>
    <div class="song-buttons" v-if="song.id">
      <nuxt-link class="btn btn--primary view-song" :to="song.id.toString()">View Song</nuxt-link>
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
      if (!this.song.chords) {
        return;
      }

      // Convert the chords from an array to a string
      return this.song.chords.join(' ');
    }
  }
};
</script>

<style lang="scss" scoped>
.song-item {
  display: flex;
  flex-direction: column;
  border-bottom: rem(1px) solid $border-light;
}

.chords--span {
  color: var(--main-dark);
  font-weight: 600;
}

.song-buttons {
  margin: rem(20px) 0;
}

.view-song {
  font-weight: 400;
  padding: rem(10px) rem(20px);
}

@media screen and (min-width: $main-break) {
  .song-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: rem(20px) 0;
  }
}
</style>

