<template>
  <li class="song-item">
    <nuxt-link v-if="song.id" class="song-link" :to="song.id.toString()">
      <div class="song-info">
        <h3>{{ song.title }}</h3>
        <p class="chords">
          <span class="chords--span">Chords:</span>
          {{ getChords }}
        </p>
      </div>
      <div class="song-buttons">
        <button class="btn btn--text view-song">View Song</button>
      </div>
    </nuxt-link>
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
  border-bottom: rem(1px) solid $border-light;
}

.song-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chords--span {
  color: var(--main-dark);
  font-weight: 600;
}

.song-buttons {
  margin: rem(20px) 0;
}

@media screen and (min-width: $main-break) {
  .song-item {
    margin: rem(20px) 0;
  }

  .song-link {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

