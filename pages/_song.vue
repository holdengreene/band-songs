<template>
  <div class="song-wrap" v-if="song" :class="isEditing ? 'editing' : ''">
    <button class="song-edit" @click="isEditing = true">Edit Song</button>
    <form class="update-form" method="post" @submit.prevent="updateSong">
      <!-- Remove readonly if currently editing -->
      <input
        class="song-title"
        type="text"
        v-model="song.title"
        :readonly="isEditing ? false : true"
      >
      <input
        class="song-chords"
        type="text"
        v-model="song.chords"
        :readonly="isEditing ? false : true"
      >
      <input
        class="song-description"
        type="textarea"
        v-model="song.description"
        :readonly="isEditing ? false : true"
      >
      <UploadUrl
        class="song-urls"
        type="text"
        v-model="song.url"
        v-for="(url, index) in song.uploadUrls"
        :key="index"
        :upload-url="{url, index, isEditing}"
        :url.sync="song.uploadUrls[index]"
      />
      <div class="form-buttons">
        <button class="submit-song">Submit Song</button>
        <button class="cancel-song">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import UploadUrl from '~/components/UploadUrl';

export default {
  components: {
    UploadUrl
  },
  data() {
    return {
      isEditing: false,
      isLoading: false,
      isSaved: false
    };
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
  },
  methods: {
    updateSong: function() {
      console.log(this.song);
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
  position: relative;
  margin-top: rem(50px);
  background-color: $off-white;
  padding: rem(50px);
  border: rem(1px) solid $border-dark;
}

.song-edit {
  position: absolute;
  right: rem(20px);
  top: rem(10px);
}

.update-form {
  display: flex;
  flex-direction: column;

  input {
    margin: rem(10px) 0;
  }
}
</style>

