import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      songsList: {},
      songsLimit: 20,
      songsOffset: 0
    }),
    mutations: {
      setSongs(state, songs) {
        state.songsList = { ...state.songsList, songs };
      },
      incrementOffset(state, offset = 0) {
        state.songsOffset += offset;
      }
    },
    actions: {
      async fetchSongs({ commit, state }) {
        const allSongs = `http://localhost:8080/bands/1/songs?limit=${
          state.songsLimit
        }&offset=${state.songsOffset}`;
        const { data } = await axios.get(allSongs);

        commit('setSongs', data.songs);
      }
    }
  });
};

export default createStore;
