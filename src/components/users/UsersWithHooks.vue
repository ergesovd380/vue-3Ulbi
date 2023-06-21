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
      <h1 class="text-light text-center">Composition Api Hooks</h1>
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
import {ref} from 'vue';
import {userPosts} from '@/hooks/userPosts'

// Hooks
const {searchValue, sort, search, state, getters, observerFunc} = userPosts()

const showDialog = ref(false);
 
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

</script>

<style scoped>
li{
  cursor: pointer;
}
</style>
