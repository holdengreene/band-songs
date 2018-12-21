import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      songsList: {}
    }),
    mutations: {
      setSongs(state, songs) {
        state.songsList = { ...state.songsList, songs };
      }
    },
    actions: {
      async nuxtServerInit({ commit, state }) {
        const allSongs = `http://localhost:8080/bands/1/songs`;
        const { data } = await axios.get(allSongs);

        commit('setSongs', data.songs);
      }
    }
  });
};

export default createStore;
