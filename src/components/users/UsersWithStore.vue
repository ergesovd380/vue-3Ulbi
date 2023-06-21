<template>
  <div>
<!--Navbar-->
    <Navbar> 
      <form class="d-flex" role="search">
        <UInput 
          :model-value="searchPost"
          @update:model-value="getSearchPost"
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
      <h1 class="text-light text-center">With VueX Option Api</h1>
<!--No posts-->
      <div v-if="noPost">
        <h1 class="text-center text-danger mt-5">
          Список постов пуст
        </h1>
      </div>

      <div v-if="!noPost">
<!--Сорторовка-->
        <div class="my-4 d-flex">
          <UButton @click="showDialog = !showDialog">Добавить пост</UButton>
          <USelect 
            :model-value="selectedSort"
            @update:model-value="getSelectedSort"
            class="ms-auto"
            :options="options"
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
          :posts="sortedAndSearchPosts"
          @deletePost="deletePost"
        />

<!--Observer-->
        <div 
          v-intersection="observerFunc"
          class="text-center py-3" 
          v-if="!searchValue"
        >
          <div>
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
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      searchValue: false
    }
  },
  methods: {
    addPost(post) {
      this.posts.push(post);
      this.showDialog = !this.showDialog;
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    closeDialog(closeDialog) {
      this.showDialog = closeDialog;
    },
// VueX
    ...mapMutations({
      getSearchPost: 'post/getSearchPost',
      getSelectedSort: 'post/getSelectedSort'
    }),
    ...mapActions({
      getPosts: 'post/getPosts',
      observerFunc: 'post/observerFunc'
    })
  },
  computed: {
// VueX
    ...mapState({
      posts: state => state.post.posts,
      options: state => state.post.options,
      selectedSort: state => state.post.selectedSort,
      searchPost: state => state.post.searchPost,
      noPost: state => state.post.noPost,
      page: state => state.post.page,
      totalPage: state => state.post.totalPage
    }),
    ...mapGetters({
      sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    })
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    searchPost(e) {
      if(e.length > 0) {
        this.searchValue = true;
        console.log(this.searchValue)
      } else {
        this.searchValue = false;
      }
    },
    page(e) {
      if(e === this.totalPage) {
        this.searchValue = true;
      }
    }
  }
}
</script>

<style scoped>
li{
  cursor: pointer;
}
</style>
