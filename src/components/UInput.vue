<template>
  <div>
    <input 
      :type="type"
      :placeholder="placeholder"
      class="form-control my-2"
      :value="modelValue"
      @input="updateValue"
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: String,
    type: String
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
 
<style scoped>
/*Style code*/
</style>