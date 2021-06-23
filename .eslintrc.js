module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true
  },
  extends: ['eslint:recommended', "plugin:prettier/recommended"],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  globals: {
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true
  },
  rules: {
    'no-unused-vars': 'warn',
    'prettier/prettier': 'warn'
  }
};
  