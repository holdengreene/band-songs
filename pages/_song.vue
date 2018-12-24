<template>
  <div class="song-wrap" v-if="song" :class="isEditing ? 'editing' : ''">
    <div class="song-banner">Test</div>
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
        v-for="(url, index) in song.uploadUrls"
        :key="index"
        :upload-url="{url, index, isEditing}"
        :url.sync="song.uploadUrls[index]"
      />
      <div class="form-buttons">
        <button class="submit-song">Update Song</button>
        <button type="button" class="cancel-song" @click="cancelChanges()">Cancel Changes</button>
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
      isUpdated: false,
      isError: false
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
    updateSong: async function() {
      this.isLoading = true;
      const { chords, description, title, uploadUrls, id } = this.song;

      // Remove all commas and use a set to de-duplicate the chords
      const removeComma = chords.replace(/,/g, '');
      const dedupeChords = new Set(removeComma.split(' '));

      // Have to convert it back to an array for the database
      const cleanChords = Array.from(dedupeChords);

      const updateUrl = `http://localhost:8080/bands/1/songs/${id}/update`;
      const {
        data: { songUpdated }
      } = await axios({
        method: 'patch',
        url: updateUrl,
        data: {
          title,
          chords: cleanChords,
          description,
          uploadUrls
        }
      });

      this.isLoading = false;
      this.isEditing = false;

      // If the song was updated change the state
      if (songUpdated[0] === 1) {
        this.isUpdated = true;
        return;
      }

      // Throw an error if the state couldn't be updated
      this.isError = true;
    },
    cancelChanges: async function() {
      // Grab the song again
      const songId = this.song.id;
      const currSong = `http://localhost:8080/bands/1/songs/${songId}`;

      const {
        data: { song }
      } = await axios.get(currSong);

      song.chords = song.chords.join(' ');

      // Reset the song with the initial song
      this.song = { ...song };

      this.isEditing = false;
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

.form-buttons {
  display: none;
}

// Add all the styles for the editing view

.editing {
  .song-edit {
    display: none;
  }

  .form-buttons {
    display: block;
  }
}
</style>

