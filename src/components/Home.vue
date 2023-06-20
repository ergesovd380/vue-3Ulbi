<template>
  <div class="container">
    <div class="text-light">
      <h1>Главная страница</h1>
      <h3>Like: {{ like }}</h3>
      <UButton @click="addLike">Like</UButton>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      like() {
        return this.$store.getters.like;
      },
      addLike() {
        return this.$store.dispatch('getLike');
      }
    }
  }
</script>

<style scoped>
/*Style code*/
</style>