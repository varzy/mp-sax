import { navigateTo } from '../../../router/router';

Component({
  properties: {
    text: String,
    routeName: String
  },

  methods: {
    onJumpTo() {
      navigateTo(this.data.routeName);
    }
  }
});
