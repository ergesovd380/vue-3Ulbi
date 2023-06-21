<template>
  <div class="bg-dark">
    <Navbar  v-if="$route.path !== '/users' & $route.path !== '/store' & $route.path !== '/composition'"/>
    <router-view></router-view>
  </div>
</template>

<script>
//code
</script>

<style scoped>
</style>