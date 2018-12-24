<template>
  <div class="create-wrap">
    <form class="create-song" method="post" @submit.prevent="createSong">
      <label for="title">Song Title</label>
      <input class="song-title" name="title" type="text" v-model="song.title">
      <label for="chords">Song Chords</label>
      <p>Please enter the chords with spaces in between. Each chord should only be entered once.</p>
      <input class="song-chords" name="chords" type="text" v-model="song.chords">
      <label for="description">Song Description</label>
      <input class="song-description" type="textarea" v-model="song.description">
      <label for="urls">
        Song Urls
        <span class="optional">- Optional</span>
      </label>
      <div class="url-holder" v-for="(url, index) of song.uploadUrls" :key="index">
        <input class="song-url" type="text" v-model="url.value">
        <button type="button" class="remove-url" @click="removeUrl(index)">X</button>
      </div>

      <button type="button" class="add-url" @click="addUrl()">Add Url</button>
      <button class="submit-button">Create Song</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      song: {
        title: '',
        chords: '',
        description: '',
        uploadUrls: []
      }
    };
  },
  methods: {
    createSong: async function() {
      const { title, chords, description, uploadUrls } = this.song;
      let cleanUrls = [];

      // Format uploadUrls
      if (uploadUrls.length > 0) {
        for (const url of uploadUrls) {
          cleanUrls.push(url.value);
        }
      }

      // Clean them chords
      const cleanChords = this.cleanChords(chords);

      const createUrl = `http://localhost:8080/bands/1/songs/create`;
      const {
        data: { songCreated }
      } = await axios({
        method: 'post',
        url: createUrl,
        data: {
          title,
          chords: cleanChords,
          description,
          uploadUrls: cleanUrls
        }
      });

      const newSongId = songCreated.id;
      this.$router.push({ path: `/${newSongId}?created=true` });
    },
    addUrl: function() {
      this.song.uploadUrls.push({ value: '' });
    },
    removeUrl: function(index) {
      this.song.uploadUrls.splice(index, 1);
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
.create-wrap {
  margin-top: rem(50px);
  background-color: $off-white;
  padding: rem(50px);
  border: rem(1px) solid $border-dark;
}

.create-song {
  display: flex;
  flex-direction: column;

  label {
    margin-top: rem(30px);
  }

  p {
    margin-bottom: 0;
  }
}

.submit-button {
  margin-top: rem(50px);
}
</style>

