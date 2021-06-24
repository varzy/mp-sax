import Basic from '../behaviors/basic';
import Router from '../behaviors/router';
import Share from '../behaviors/share';

const basePlusOptions = {
  withBasic: true,
  withRouter: false,
  withShare: false
};

export function ComponentPlus(options) {
  const { plusOptions, ...componentOptions } = options;
  const finalPlusOptions = { ...basePlusOptions, ...plusOptions };

  // behaviors
  componentOptions.behaviors = componentOptions.behaviors || [];
  finalPlusOptions.withBasic && componentOptions.behaviors.push(Basic);
  finalPlusOptions.withRouter && componentOptions.behaviors.push(Router);
  finalPlusOptions.withShare && componentOptions.behaviors.push(Share);

  // default options
  componentOptions.options = componentOptions.options || {};
  componentOptions.options.addGlobalClass = true;

  Component(componentOptions);
}
