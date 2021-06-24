/**
 * 定义页面路径。目的是为了降低 pages 目录结构更新后需要大量修改路由跳转路径的问题
 * 最好结合 router.js 一起使用
 * 页面路径要与 app.json 中的保持一致
 */
export const Routes = {
  Index: '/pages/index/index',
  SampleBasic: '/pages/samples/basic/basic',
  SampleWaterfall: '/pages/samples/waterfall/waterfall'
};
