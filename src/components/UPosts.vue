<template>
  <transition-group
    name="list"
  >
    <h1 class="text-light">Posts</h1>
    <div 
      class="p-3 my-3 border border-2 border-primary text-light"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="my-2"><strong>User id: </strong>{{ post.userId }}</div>
      <div class="my-2"><strong>Name: </strong>{{ post.title }}</div>
      <div class="my-2"><strong>Description: </strong>{{ post.body }}</div>
  
      <div class="text-end">
        <UButton
          @click="deletePost(post)"
        >
          Delete
        </UButton>
        <UButton
          @click="openId(post)"
          class="mx-2"
        >
          Open
        </UButton>
      </div>
    </div>
  </transition-group>
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
      },
      openId(data) {
        this.$router.push('/users/' + data.id)
      }
    }
  }
</script>

<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.8s ease;
}
</style>