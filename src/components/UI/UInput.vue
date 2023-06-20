<template>
  <input 
    :type="type"
    :placeholder="placeholder"
    class="form-control"
    :value="modelValue"
    @input="updateValue"
  >
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