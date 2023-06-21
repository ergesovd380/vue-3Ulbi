import axios from 'axios';

export default {
  state: () => ({
    loading: false,
    user: [],
    id: null
  }),

  getters: {
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    }
  },

  mutations: {
    getLoading(state, loading) {
      state.loading = loading;
    },
    getUser(state, user) {
      state.user = user;
    },
    getId(state, id) {
      state.id = id
    }
  },

  actions: {
    async getUser({commit, state}) {
      try {
        commit('getLoading', true);
        const newPost = await axios.get('https://jsonplaceholder.typicode.com/posts?id=' + state.id);
        commit('getUser', newPost.data);
      } catch (e) {
        commit('getLoading', false);
      } finally {
        commit('getLoading', false);
      }
    }
  },

  namespaced: true
}
