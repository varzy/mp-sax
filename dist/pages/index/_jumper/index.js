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
      console.log(this.$emit);
      this.$router.navigateTo(this.data.routeName);
    }
  }
});
