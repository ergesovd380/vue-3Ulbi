import { useStore } from 'vuex';
import {ref, computed, reactive, onMounted, watch} from 'vue';
export function userPosts() {
  const searchValue = ref(false);
  const sort = ref('');
  const search = ref('');

// VueX
  const store = useStore()
  const state = reactive({
    posts: computed(() => store.state.post.posts),
    options: computed(() => store.state.post.options),
    allPosted: computed(() => store.state.post.liallPostedmit),
    noPost: computed(() => store.state.post.noPost),
    totalPage: computed(() => store.state.post.totalPage)
  });
  const page = computed(() => store.state.post.page)

  const getters = reactive({
    sortedAndSearchPosts: computed(() => store.getters['post/sortedAndSearchPosts'])
  });

  //actions
  const getPosts = () => store.dispatch('post/getPosts');
  const observerFunc = () => store.dispatch('post/observerFunc');

  onMounted(getPosts)

  watch(search, (e) => {
    store.commit('post/getSearchPost', e)
    if(e.length > 0) {
      searchValue.value = true
    } else {
      searchValue.value = false
    }
  })
  watch(sort, (s) => {
    store.commit('post/getSelectedSort', s)
  })
  watch(page, (p) => {
    if(p === state.totalPage) {
      searchValue.value = true;
    }
  })

  return {
    searchValue,
    sort,
    search,
    state,
    getters,
    observerFunc
  }
}
