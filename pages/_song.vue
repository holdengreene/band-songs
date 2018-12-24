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
      <div class="url-holder" v-for="(url, index) of song.uploadUrls" :key="index">
        <input class="song-url" type="text" v-model="url.value">
        <button type="button" class="remove-url" @click="removeUrl(index)">X</button>
      </div>

      <button type="button" class="add-url" @click="addUrl()">Add Url</button>

      <div class="form-buttons">
        <button class="submit-song">Update Song</button>
        <button type="button" class="cancel-song" @click="cancelChanges()">Cancel Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
      let formattedUrl = [];

      // Split the chords up to a string
      song.chords = song.chords.join(' ');

      // Format the urls correctly. Doing this makes it easier to modify
      for (const url of song.uploadUrls) {
        formattedUrl.push({ value: url });
      }

      song.uploadUrls = formattedUrl;

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

      const cleanChords = this.cleanChords(chords);

      const updateUrl = `http://localhost:8080/bands/1/songs/${id}/update`;

      let cleanUrls = [];

      // Format uploadUrls
      if (uploadUrls.length > 0) {
        for (const url of uploadUrls) {
          cleanUrls.push(url.value);
        }
      }

      const {
        data: { songUpdated }
      } = await axios({
        method: 'patch',
        url: updateUrl,
        data: {
          title,
          chords: cleanChords,
          description,
          uploadUrls: cleanUrls
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
    addUrl: function() {
      this.song.uploadUrls.push({ value: '' });
    },
    removeUrl: function(index) {
      this.song.uploadUrls.splice(index, 1);
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
    },
    cleanChords: function(chords) {
      // Remove all commas and use a set to de-duplicate the chords
      const removeComma = chords.replace(/,/g, '');
      const dedupeChords = new Set(removeComma.split(' '));

      // Have to convert it back to an array for the database
      const cleanChords = Array.from(dedupeChords);

      return cleanChords;
    }
  }
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

.form-buttons,
.add-url,
.remove-url {
  display: none;
}

// Add all the styles for the editing view

.editing {
  .song-edit {
    display: none;
  }

  .form-buttons,
  .add-url,
  .remove-url {
    display: block;
  }
}
</style>

