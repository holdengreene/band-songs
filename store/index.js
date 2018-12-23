import Vuex from 'vuex';
import axios from 'axios';

export const state = () => ({
  songsList: {},
  songsEmpty: false
});

export const mutations = {
  setSongs(state, songs) {
    state.songsList = { ...state.songsList, songs };
  },
  setSongsEmpty(state, empty) {
    state.songsEmpty = empty;
  }
};

export const getters = {
  getSongById: state => id => {
    return state.songsList.songs.find(song => song.id === id);
  }
};

export const actions = {
  async nuxtServerInit({ commit, state }) {
    try {
      const allSongs = `http://localhost:8080/bands/1/songs`;
      const { data } = await axios.get(allSongs);

      commit('setSongs', data.songs);
    } catch (e) {
      commit('setSongsEmpty', true);
    }
  }
};
