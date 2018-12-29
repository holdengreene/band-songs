<template>
  <div>
    <ContentHolder>
      <div class="create-wrap" :class="setClasses">
        <form class="create-song" method="post" @submit.prevent="createSong">
          <label for="title">Song Title</label>
          <input class="song-title" name="title" type="text" v-model="song.title" required>
          <label for="chords">Song Chords</label>
          <p>Please enter the chords with spaces in between. Each chord should only be entered once.</p>
          <input class="song-chords" name="chords" type="text" v-model="song.chords" required>
          <label for="description">
            Song Description
            <span class="optional">- Optional</span>
          </label>
          <input class="song-description" type="textarea" v-model="song.description">
          <label for="urls">
            Song Urls
            <span class="optional">- Optional</span>
          </label>
          <div class="url-holder" v-for="(url, index) of song.uploadUrls" :key="index">
            <input class="song-url" type="text" v-model="url.value">
            <button type="button" class="remove-url" @click="removeUrl(index)">X</button>
          </div>

          <button type="button" class="add-url btn btn--light" @click="addUrl()">Add Url</button>
          <button class="submit-button btn btn--primary">Create Song</button>
        </form>
      </div>
    </ContentHolder>
  </div>
</template>

<script>
import axios from 'axios';
import ContentHolder from '~/components/ContentHolder.vue';
import { apiUrl } from '~/assets/js/siteDefinitions';

export default {
  components: {
    ContentHolder
  },
  data() {
    return {
      song: {
        title: '',
        chords: '',
        description: '',
        uploadUrls: []
      },
      isLoading: false,
      isCreated: false
    };
  },
  computed: {
    setClasses: function() {
      if (this.isLoading) {
        return 'loading';
      } else if (this.isCreated) {
        return 'created';
      }

      return '';
    }
  },
  methods: {
    createSong: async function() {
      const { title, chords, description, uploadUrls } = this.song;
      let cleanUrls = [];

      this.isLoading = true;

      // Format uploadUrls
      if (uploadUrls.length > 0) {
        for (const url of uploadUrls) {
          cleanUrls.push(url.value);
        }
      }

      // Clean them chords
      const cleanChords = this.cleanChords(chords);

      const createUrl = `${apiUrl}/bands/1/songs/create`;
      const {
        data: { songCreated }
      } = await axios.post(createUrl, {
        title,
        chords: cleanChords,
        description,
        uploadUrls: cleanUrls
      });

      this.isLoading = false;
      this.isCreated = true;

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
  padding: rem(50px);
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
  width: 100%;
  align-self: center;
}

.add-url {
  width: 30%;
  font-size: rem(16px);
}

.remove-url {
  background-color: var(--background);
  border: rem(1px) solid $border-light;
  border-left: none;
  padding: rem(2px) rem(10px);
  cursor: pointer;
}

.url-holder {
  display: flex;
  align-items: flex-start;
}

.song-url {
  width: 40%;
  margin-bottom: rem(15px);
}

@media screen and (min-width: $main-break) {
  .submit-buttom {
    width: 50%;
  }

  .add-url {
    width: 10%;
  }
}
</style>

