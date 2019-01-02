<template>
  <div>
    <ContentHolder :class="setClasses">
      <div class="create-wrap">
        <h1 class="center-txt">Create A Song</h1>
        <form class="create-song" method="post" @submit.prevent="createSong">
          <label for="title">Song Title</label>
          <input class="song-title" name="title" type="text" v-model="song.title" required>
          
          <label for="chords">Song Chords</label>
          <p>A list of all the chords in the song. Separate each chord with a space in between.</p>
          <input class="song-chords" name="chords" type="text" v-model="song.chords" required>
          
          <label for="description">
            Song Description
            <span class="optional">- Optional</span>
          </label>
          <p>Enter a description for the song. The could also include song structure.</p>
          <textarea class="song-description" rows="4" v-model="song.description"/>
          
          <label for="urls">
            Song URLs
            <span class="optional">- Optional</span>
          </label>
          <p>Add multiple URLs for the song. These can point to recordings, videos, or cat pictures. Really anything to do with the song.</p>
          <div class="url-holder" v-for="(url, index) of song.uploadUrls" :key="index">
            <input class="song-url" type="text" v-model="url.value">
            <button type="button" class="remove-url" @click="removeUrl(index)">X</button>
          </div>

          <button type="button" class="add-url btn btn--shadow btn--light" @click="addUrl()">Add URL</button>
          <button class="submit-button btn btn--shadow btn--primary">Create Song</button>
        </form>
      </div>

      <div class="created-section">
        <h1>Song Created</h1>
        <p>{{ createdSong.title }} has been created. You can either view it or create another if you'd like.</p>
        <nuxt-link :to="{ path: `/${createdSong.id}` }" class="btn btn--shadow btn--primary">View Song</nuxt-link>
        <button class="reset-form btn btn--shadow btn--light" @click="resetForm()">Create Another</button>
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
      isCreated: false,
      createdSong: {}
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

      this.createdSong = { ...songCreated };

      this.isLoading = false;
      this.isCreated = true;
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
    },
    resetForm: function() {
      this.isLoading = false;
      this.isCreated = false;

      this.song = {
        title: '',
        chords: '',
        description: '',
        uploadUrls: []
      };

      this.createdSong = {};
    }
  },
  head() {
    return {
      title: 'PPK - Create A Song'
    };
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

.url-holder {
  display: flex;
  align-items: flex-start;
  margin-bottom: rem(15px);
}

.remove-url {
  background-color: var(--background);
  border: rem(1px) solid $border-light;
  border-left: none;
  padding: rem(5px) rem(10px);
  cursor: pointer;
}

.song-url {
  width: 85%;
}

.created-section {
  display: none;
  text-align: center;
}

.created {
  .create-wrap {
    display: none;
  }

  .created-section {
    display: block;

    .btn {
      margin: 0 rem(10px);
    }
  }
}

@media screen and (min-width: $main-break) {
  .submit-button {
    width: 50%;
  }

  .add-url {
    width: 20%;
  }

  .song-url {
    width: 40%;
  }
}
</style>

