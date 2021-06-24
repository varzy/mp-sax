import { ComponentPlus } from '../../../utils/component-plus';

ComponentPlus({
  plusOptions: {
    withRouter: true
  },

  properties: {
    text: String,
    routeName: String
  },

  methods: {
    onJumpTo() {
      this.$router.navigateTo(this.data.routeName);
    }
  }
});
