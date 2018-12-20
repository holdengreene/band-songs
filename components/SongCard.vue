<template>
  <div class="card">
    <div class="card-content">
      <h3 class="title">{{ song.title }}</h3>
      <p class="subtitle">{{ song.chords }}</p>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">Edit Song</p>
    </footer>
  </div>
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
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: $dark-heading;
}

.subtitle {
  font-weight: 600;
}

.card-footer-item {
  margin: 0;
}
</style>

