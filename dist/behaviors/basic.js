export default Behavior({
  methods: {
    $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    setDataP(data) {
      this.setData(data);
      return new Promise(function (resolve) {
        return wx.nextTick(resolve);
      });
    }
  }
});
