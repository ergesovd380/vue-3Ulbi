<template>
  <div class="bg-dark">
    <Navbar v-if="$route.path !== '/users'" />
    <router-view></router-view>
  </div>
</template>

<script>
//code
</script>

<style scoped>
</style>