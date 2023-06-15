<template>
  <div class="container">
    <UForm
      @addPost="addPost" 
    />
    <UPosts 
      :posts="posts"
      @deletePost="deletePost"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'JavaScript', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, veritatis.'},
        {id: 2, title: 'Vue', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, veritatis.'},
        {id: 3, title: 'Nuxt', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, veritatis.'},
        {id: 4, title: 'HTML', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, veritatis.'},
        {id: 5, title: 'CSS', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, veritatis.'},
      ],

    }
  },
  methods: {
    addPost(post) {
      this.posts.push(post)
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    }
  }
}
</script>

<style scoped>
</style>