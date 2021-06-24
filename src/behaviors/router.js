import router from '../router/router';

export default Behavior({
  lifetimes: {
    attached() {
      this.$router = router;
    }
  }
});
