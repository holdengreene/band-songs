<template>
  <div class="song-wrap" v-if="song">
    <input class="song-title" type="text" v-model="song.title">
    <input class="song-chords" type="text" v-model="song.chords">
    <input class="song-description" type="textarea" v-model="song.description">
    <UploadUrl
      class="song-urls"
      type="text"
      v-model="song.url"
      v-for="(url, index) in song.uploadUrls"
      :key="index"
      :upload-url="{url, index}"
      :url.sync="song.uploadUrls[index]"
    />
  </div>
</template>

<script>
import axios from 'axios';
import UploadUrl from '~/components/UploadUrl';

export default {
  components: {
    UploadUrl
  },
  // Add current song to data on page load
  async asyncData({ params }) {
    const songId = params.song;
    const currSong = `http://localhost:8080/bands/1/songs/${songId}`;

    try {
      const {
        data: { song }
      } = await axios.get(currSong);

      // Split the chords up to a string
      song.chords = song.chords.join(' ');

      if (!song) {
        return { noSong: true };
      }

      return { song };
    } catch (e) {
      return { noSong: true };
    }
  }
  // Get the current song from vuex at any time
  // computed: {
  //   convertChords: function() {
  //     // Convert the chords from an array to a string
  //     const chords = this.song.chords.join(' ');
  //     return this.$set(this.song, "chords", chords);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.song-wrap {
  margin-top: rem(50px);
  background-color: $off-white;
  padding: rem(50px);
  border: rem(1px) solid $border-dark;
}
</style>

