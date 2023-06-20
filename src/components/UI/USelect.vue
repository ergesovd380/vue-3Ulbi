<template>
  <div>
    <select 
      class="form-select" 
      @change="sortPosts"
    >
      <option 
        selected 
        disabled
      >
        Выберите сортировку
      </option>
      <option 
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    sortPosts(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
/*Style code*/
</style>