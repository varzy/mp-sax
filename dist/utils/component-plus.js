import Emit from '../behaviors/emit';
import Router from '../behaviors/router';
import Share from '../behaviors/share';

const basePlusOptions = {
  withEmit: true,
  withRouter: false,
  withShare: false
};

export function ComponentPlus(options) {
  const { plusOptions, ...componentOptions } = options;
  const finalPlusOptions = { ...basePlusOptions, ...plusOptions };

  // behaviors
  componentOptions.behaviors = options.behaviors || [];
  finalPlusOptions.withEmit && componentOptions.behaviors.push(Emit);
  finalPlusOptions.withRouter && componentOptions.behaviors.push(Router);
  finalPlusOptions.withShare && componentOptions.behaviors.push(Share);

  // default options
  // ...

  Component(componentOptions);
}
