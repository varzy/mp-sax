import { ComponentPlus } from '../../../utils/component-plus';

ComponentPlus({
  data: {
    tips: {
      tips: [
        `tips 组件可以用来展示一些轻提示`,
        `内部使用 &lt;rich-text /&gt; 进行渲染，<b>因此可以支持一些<i  style="color: red">简单的富文本</i></b>`,
        `支持隐藏序号、无序序号和有序序号`
      ],
      withPrefix: true,
      useIndex: true
    }
  },

  methods: {
    onTipsPropsChange(e) {
      const propName = e.currentTarget.dataset.prop;
      const propVal = this.data.tips[propName];

      this.setData({ [`tips.${propName}`]: !propVal });
    }
  }
});
