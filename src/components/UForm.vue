<template>
  <form @submit.prevent.stop>
    <div class="form-group">
      <UInput
        type="text" 
        placeholder="Name"
        v-model="post.title"
      />
      <UInput
        type="text"
        placeholder="Description"
        v-model="post.body"
      />
    </div>
    <div class="text-end">
      <UButton  
        class="btn btn-primary"
        @click="addPost"
        :disabled="post.title.length < 3 | post.body.length < 3"
      >Add post</UButton>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      addPost() {
        this.post.id = Math.floor(Math.random() * 10) + 6,
        this.$emit('addPost', this.post);
        this.post = {
          title: '',
          body: ''
        }
      }
    }
  }
</script>

<style scoped>
/*Style code*/
</style>