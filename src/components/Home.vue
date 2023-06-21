<template>
  <div class="container">
    <div class="text-light">
      <h1>Главная страница</h1>
      <h3>Limit: {{ limit }}</h3>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState({
        limit: state => state.post.limit
      })
    }
  }
</script>

<style scoped>
/*Style code*/
</style>