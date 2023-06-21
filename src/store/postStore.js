import axios from 'axios'

export default {
  state: () => ({
    posts: [],
    options: [
      {value: 'title', name: 'По названию'},
      {value: 'body', name: 'По описанию'}
    ],
    selectedSort: '',
    searchPost: '',
    page: 1,
    limit: 10,
    totalPage: 0,
    allPosted: false,
    noPost: false,
  }),

  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
      })
    },
    sortedAndSearchPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchPost.toLowerCase()) | post.body.toLowerCase().includes(state.searchPost.toLowerCase()));
    }
  },

  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    getPage(state, page) {
      state.page = page;
    },
    getTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    getAllPosted(state, allPosted) {
      state.allPosted = allPosted;
    },
    getNoPost(state, noPost) {
      state.noPost = noPost;
    },
    getSearchPost(state, searchPost) {
      state.searchPost = searchPost;
    },
    getSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    getCounter(state, payload) {
      state.counter = payload
    }
  },

  actions: {
    async getPosts({state, commit}) {
      try {
        const newPosts = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('getTotalPage', Math.ceil(newPosts.headers['x-total-count'] / state.limit));
        commit('getPosts', newPosts.data);
      } catch (e) {
        commit('getNoPost', true);
      }
    },
    async observerFunc({state, commit}) {
      try {
        commit('getPage', state.page + 1);
        const newPosts = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('getTotalPage', Math.ceil(newPosts.headers['x-total-count'] / state.limit));
        commit('getPosts', [...state.posts, ...newPosts.data]);
      } catch (e) {
        console.log('Error')
      }
    }
  },

  namespaced: true
}
