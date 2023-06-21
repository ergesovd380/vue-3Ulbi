<template>
  <div>
<!--Navbar-->
    <Navbar> 
      <form class="d-flex" role="search">
        <UInput 
          v-focus
          class="me-2" 
          type="search" 
          placeholder="Поиск..." 
          v-model="searchPost"
        />
        <UButton type="submit">Поиск</UButton>
      </form>
    </Navbar>
<!--Content-->
    <div class="container">
      <h1 class="text-light text-center">Option Api {{ $store.state.limit }}</h1>
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
            class="ms-auto"
            :options="options"
            v-model="selectedSort"
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
    
<!--Pagination-->
        <!-- <div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" @click="minusPage">
                <a class="page-link">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li 
                class="page-item"
                :class="{'active': this.page === page}"
                v-for="page in totalPage"
                :key="page"
                @click="this.page = page"
              >
                <a class="page-link">{{ page }}</a>
              </li>
              <li class="page-item" @click="plusPage">
                <a class="page-link">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div> -->

        <!--Observer-->
        <div 
          v-intersection="observerFunc"
          class="text-center py-3" 
          v-if="!searchValue"
        >
          <div v-if="allPosted">
            <h1 class="text-light">Все посты загружены</h1>
          </div>
          <div v-else>
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
import axios from 'axios'
export default {
  data() {
    return {
      showDialog: false,
      posts: [],
      options: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}
      ],
      selectedSort: '',
      searchPost: '',
      searchValue: false,
      page: 1,
      limit: 10,
      totalPage: null,
      noPost: false,
      allPosted: false
    }
  },
  methods: {
    addPost(post) {
      this.posts.push(post)
      this.showDialog = !this.showDialog 
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    closeDialog(closeDialog) {
      this.showDialog = closeDialog
    },

// For pagintaion
    // minusPage() {
    //   if(this.page > 1) {
    //     this.page--
    //   }
    // },
    // plusPage() {
    //   if(this.page < 10) {
    //     this.page++
    //   }
    // },

    async getPosts() {
      try {
        const newPosts = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPage = Math.ceil(newPosts.headers['x-total-count'] / this.limit) 
        this.posts = newPosts.data;
      } catch (e) {
        this.noPost = true;
      }
    },
    async observerFunc() {
      if(!this.searchValue) {
        this.page++
        try {
          const newPosts = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          })
          this.totalPage = Math.ceil(newPosts.headers['x-total-count'] / this.limit) 
          this.posts = [...this.posts, ...newPosts.data]
        } catch (e) {
          console.log('Error')
        } finally{
          if(this.page === this.totalPage) {
            this.allPosted = true
          }
        }
      }
    }
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchPost.toLowerCase()) | post.body.toLowerCase().includes(this.searchPost.toLowerCase()))
    }
  },
  mounted() {
    this.getPosts();
  },
  watch: {
// For pagination
    // page() {
    //   this.getPosts()
    // },

    searchPost(e) {
      if(e.length > 0) {
        this.searchValue = true;
        console.log(this.searchValue)
      } else {
        this.searchValue = false;
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
