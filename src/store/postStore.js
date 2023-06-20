import axios from 'axios'

export default postStore = {
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
    loading: false,
    noPost: false
  }),

  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
      })
    },
    sortedAndSearchPosts(getters, state) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchPost.toLowerCase()) | post.body.toLowerCase().includes(state.searchPost.toLowerCase()));
    },
    options(state) {
      return state.options;
    },
    selectedSort(state) {
      return state.selectedSort;
    },
    searchPost(state) {
      return state.searchPost;
    },
    page(state) {
      return state.page;
    },
    totalPage(state) {
      return state.totalPage;
    },
    loading(state) {
      return state.loading;
    },
    noPost(state) {
      return state.noPost;
    }
  },

  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    getOptions(state, options) {
      state.options = options;
    },
    getSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    getSearchPost(state, searchPost) {
      state.searchPost = searchPost;
    },
    getPage(state, page) {
      state.page = page;
    },
    getLimit(state, limit) {
      state.limit = limit;
    },
    getTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    getLoading(state, loading) {
      state.loading = loading;
    },
    getNoPost(state, noPost) {
      state.noPost = noPost;
    }
  },

  actions: {
    async getPosts({state, commit}) {
      try {
        commit('getLoading', true);
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
        commit('getLoading', false);
      } finally {
        commit('getLoading', false);
      }
    },
    async observerFunc({state, commit}) {
      commit('getPage', +1);
      try {
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
  }
}
