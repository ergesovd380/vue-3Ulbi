export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    turnOff() {
      const showDialog = !this.showDialog
      this.$emit('closeDialog', showDialog)
    }
  }
}
