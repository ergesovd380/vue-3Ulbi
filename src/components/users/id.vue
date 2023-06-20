<template>
  <div class="container text-light">
    <div 
      v-if="loading"
      class="text-center pt-5"
    >
      <div 
        class="spinner-border text-primary" 
        style="width: 3rem; height: 3rem;" 
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div class="my-2"><strong>User id: </strong>{{ user.userId }}</div>
      <div class="my-2"><strong>Name: </strong>{{ user.title }}</div>
      <div class="my-2"><strong>Description: </strong>{{ user.body }}</div>
      <button class="btn btn-primary" @click="getPosts">Get Post</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        user: []
      }
    },
    methods: {
      async getPosts() {
        try {
          this.loading = true;
          console.log(this.loading);
          const newPost = await axios.get('https://jsonplaceholder.typicode.com/posts?id=1')
          this.user = newPost.data;
          console.log(this.user);
        } catch (e) {
          this.loading = false;
        } finally {
          this.loading = false
          console.log(this.loading);
        }
      },
    }
  }
</script>

<style scoped>
/*Style code*/
</style>