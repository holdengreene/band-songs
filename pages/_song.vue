<template>
  <div>
    <ContentHolder :class="isEditing ? 'editing' : ''">
      <button class="song-edit btn btn--primary" @click="editSong()">Edit Song</button>
      <button class="song-delete btn btn--warning" @click="showModal = true">Delete Song</button>
      <div class="song-wrap" v-if="song">
        <!-- <div class="song-banner">Test</div> -->
        <form class="update-form" method="post" @submit.prevent="updateSong">
          <!-- Remove readonly if currently editing -->
          <label for="title">Song Title</label>
          <input
            class="song-title"
            name="title"
            type="text"
            v-model="song.title"
            :readonly="isEditing ? false : true"
          >
          
          <label for="chords">Song Chords</label>
          <p
            v-if="isEditing"
          >A list of all the chords in the song. Separate each chord with a space in between.</p>

          <input
            class="song-chords"
            type="text"
            name="chords"
            v-model="song.chords"
            :readonly="isEditing ? false : true"
          >
          
          <label for="description">
            Song Description
            <span class="optional">- Optional</span>
          </label>
          <p
            v-if="isEditing"
          >Enter a description for the song. The could also include song structure.</p>
          <textarea
            class="song-description"
            v-model="song.description"
            name="description"
            rows="4"
            :readonly="isEditing ? false : true"
          />
          
          <label for="urls">
            Song URLs
            <span class="optional">- Optional</span>
          </label>
          <p
            v-if="isEditing"
          >Add multiple URLs for the song. These can point to recordings, videos, or cat pictures. Really anything to do with the song.</p>
          <div class="url-holder" v-for="(url, index) of song.uploadUrls" :key="index">
            <input
              class="song-url"
              type="text"
              v-model="url.value"
              :readonly="isEditing ? false : true"
            >
            <button type="button" class="remove-url" @click="removeUrl(index)">X</button>
          </div>

          <button type="button" class="add-url" @click="addUrl()">Add Url</button>

          <div class="form-buttons">
            <button class="submit-song btn btn--primary">Update Song</button>
            <button
              type="button"
              class="cancel-song btn btn--light"
              @click="cancelChanges()"
            >Cancel Changes</button>
          </div>
        </form>
      </div>
    </ContentHolder>

    <div class="song-modal-section" :class="showModal ? 'active' : ''">
      <div class="song-modal">
        <h2>Are you sure you want to delete this song?</h2>
        <p>This action is un-undoable.</p>
        <button class="song-modal__delete btn btn--warning" @click="deleteSong()">Delete Song</button>
        <button class="song-modal__cancel btn btn--light" @click="showModal = false">Cancel</button>
      </div>
    </div>
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
      song: {},
      isCreated: false,
      noSong: false,
      isEditing: false,
      isLoading: false,
      isUpdated: false,
      isError: false,
      isDeleted: false,
      showModal: false,
      initialSong: {}
    };
  },
  // Add current song to data on page load
  async asyncData({ params, query }) {
    const songId = params.song;
    const created = query.created;
    let isCreated = false;

    if (created) {
      isCreated = true;
    }

    const currSong = `${apiUrl}/bands/1/songs/${songId}`;

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

      return { song, isCreated };
    } catch (e) {
      return { noSong: true };
    }
  },
  methods: {
    updateSong: async function() {
      this.isLoading = true;
      const { chords, description, title, uploadUrls, id } = this.song;
      const cleanChords = this.cleanChords(chords);

      const updateUrl = `${apiUrl}/bands/1/songs/${id}/update`;

      let cleanUrls = [];

      // Format uploadUrls
      if (uploadUrls.length > 0) {
        for (const url of uploadUrls) {
          // Remove empty urls
          if (url.value === '') {
            continue;
          }

          cleanUrls.push(url.value);
        }
      }

      const {
        data: { songUpdated }
      } = await axios.post(updateUrl, {
        title,
        chords: cleanChords,
        description,
        uploadUrls: cleanUrls
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
    deleteSong: async function() {
      this.isLoading = true;

      const deleteUrl = `${apiUrl}/bands/1/songs/${this.song.id}/destroy`;

      const {
        data: { success }
      } = await axios.delete(deleteUrl);

      if (success === 1) {
        this.isDeleted = true;
      }

      this.isLoading = false;
    },
    addUrl: function() {
      this.song.uploadUrls.push({ value: '' });
    },
    removeUrl: function(index) {
      this.song.uploadUrls.splice(index, 1);
    },
    editSong: function() {
      this.isEditing = true;

      // Save the unchanged song to initialSong
      this.initialSong = JSON.parse(JSON.stringify(this.song));
    },
    cancelChanges: function() {
      // Grab the song again from data
      this.song = { ...this.initialSong };

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
  padding: rem(15px);
}

.song-edit,
.song-delete {
  align-self: flex-start;
  margin: rem(10px) 0;
}

.song-delete {
  display: none;
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

  .add-url,
  .remove-url,
  .song-delete {
    display: block;
  }

  .form-buttons {
    display: flex;
    justify-content: center;
    margin-top: rem(25px);

    .btn {
      margin: 0 rem(10px);
    }
  }
}

.song-modal-section {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  z-index: 2;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.active {
    pointer-events: auto;
    opacity: 1;
  }
}

.song-modal {
  background-color: #fff;
  border-radius: rem(3px);
  box-shadow: $box-shadow;
  padding: rem(20px);
}

.song-modal__delete {
  margin-right: rem(20px);
}

@media screen and (min-width: $main-break) {
  .song-wrap {
    padding: rem(50px);
  }

  .song-edit,
  .song-delete {
    align-self: flex-end;
  }
}
</style>

