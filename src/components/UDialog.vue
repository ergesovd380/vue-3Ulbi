<template>
  <div 
    class="dialog"
    v-if="showDialog === true"
    @click="turnOff"
  >
    <div 
      class="dialog__content"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import dialogMixin from '@/mixins/dialogMixin';
export default {
  mixins: [dialogMixin]
}
</script>

<style scoped>
.dialog{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex; 
}
.dialog__content{
  background: #fff;
  margin: auto;
  padding: 15px;
  border-radius: 25px;
  min-width: 500px;
  min-height: 200px;
}
</style>