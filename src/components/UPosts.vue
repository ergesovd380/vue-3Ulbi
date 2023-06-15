<template>
  <div 
    class="p-3 my-3 border border-2 border-primary"
    v-for="post in posts"
    :key="post.id"
  >
    <div class="my-2"><strong>Name: </strong>{{ post.title }}</div>
    <div class="my-2"><strong>Description: </strong>{{ post.body }}</div>

    <div class="text-end">
      <UButton
        @click="deletePost(post)"
      >
        Delete
      </UButton>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['posts'],
    methods: {
      deletePost(post) {
        const deletePost = {
          title: post.title,
          body: post.body,
          id: post.id
        }
        console.log(deletePost.id)
        this.$emit('deletePost', deletePost)
      }
    }
  }
</script>

<style scoped>
/*Style code*/
</style>