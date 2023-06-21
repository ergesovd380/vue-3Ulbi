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
    <div v-else v-for="user in userData">
      <div class="my-2"><strong>User id: </strong>{{ user.id }}</div>
      <div class="my-2"><strong>Name: </strong>{{ user.title }}</div>
      <div class="my-2"><strong>Description: </strong>{{ user.body }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  props: ['id'],
  methods:{
    ...mapActions({
      getUser: 'user/getUser'
    }),
    ...mapMutations({
      getId: 'user/getId'
    })
  },
  computed: {
    ...mapGetters({
      loading: 'user/loading',
      userData: 'user/user'
    }),
  },
  mounted() {
    this.getId(this.id)
    this.getUser()
  }
}
</script>
