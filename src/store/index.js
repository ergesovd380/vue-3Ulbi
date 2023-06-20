import { createStore } from 'vuex'
// import postStore from './postStore'

export default createStore({
  state: {
    like: 0,
    disLike: 0
  },
  getters: {
    like(state) {
      return state.like;
    },
    disLike(state) {
      return state.disLike;
    }
  },
  mutations: {
    getLike(state, like) {
      state.like = like;
    },
    getDisLike(state, disLike) {
      state.disLike = disLike;
    }
  },
  actions: {
    getLike({commit, state}) {
      commit('getLike', state.like++)
    }
  },
  // modules: {
  //   post: postStore
  // }
})
