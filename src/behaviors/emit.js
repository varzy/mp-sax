export default Behavior({
  methods: {
    $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    }
  }
});
