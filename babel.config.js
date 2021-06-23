module.exports = {
  // 查看增强编译一节
  // <https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html>
  targets: {
    chrome: '53',
    ios: '8'
  },
  presets: ['@babel/preset-env'],
  plugins: [
    // 支持 class 中的 static 成员变量
    '@babel/plugin-syntax-class-properties'
  ]
};
