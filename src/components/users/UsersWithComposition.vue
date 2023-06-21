<template>
  <div>
<!--Navbar-->
    <Navbar> 
      <form class="d-flex" role="search">
        <UInput 
          v-model="search"
          v-focus
          class="me-2" 
          type="search" 
          placeholder="Поиск..." 
        />
        <UButton type="submit">Поиск</UButton>
      </form>
    </Navbar>
<!--Content-->
    <div class="container">
      <h1 class="text-light text-center">With VueX Composition Api</h1>
<!--No posts-->
      <div v-if="state.noPost">
        <h1 class="text-center text-danger mt-5">
          Список постов пуст
        </h1>
      </div>

      <div v-else>
<!--Сорторовка-->
        <div class="my-4 d-flex">
          <UButton @click="showDialog = !showDialog">Добавить пост</UButton>
          <USelect 
            v-model="sort"
            class="ms-auto"
            :options="state.options"
          />
        </div>
  
  <!--Dialog to add post-->
        <UDialog
          :showDialog="showDialog"
          @closeDialog="closeDialog"
        > 
          <UForm
            @addPost="addPost" 
          />
        </UDialog>

<!--Posts-->
        <UPosts 
          :posts="getters.sortedAndSearchPosts"
          @deletePost="deletePost"
        />

<!--Observer-->
        <div 
          v-intersection="observerFunc"
          class="text-center py-3" 
          v-if="!searchValue"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import {ref, computed, reactive, onMounted, watch} from 'vue';

const showDialog = ref(false);
const searchValue = ref(false);
const sort = ref('');
const search = ref('');

// Emit methods
const addPost = (post) => {
  state.posts.push(post);
  showDialog.value = !showDialog.value;
};
const deletePost = (post) => {
  state.posts = state.posts.filter(p => p.id !== post.id);
};
const closeDialog = (closeDialog) => {
  showDialog.value = closeDialog;
};

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



</script>

<style scoped>
li{
  cursor: pointer;
}
</style>
