import { Routes } from './routes';

/**
 * 构建 url 参数
 * @param {string|object|null} params
 */
export const buildParams = params => {
  let fullParamStr;
  if (!params) {
    fullParamStr = '';
  } else if (typeof params === 'string') {
    fullParamStr = params;
  } else {
    fullParamStr = Object.keys(params)
      .map((key, index) => {
        const prefix = index === 0 ? `?` : `&`;
        return `${prefix}${key}=${params[key]}`;
      })
      .join('');
  }

  return fullParamStr;
};

/**
 * 高阶函数构建路由跳转模块
 * @param {Function} method
 */
const generateRoute = method => (routeName, params, events) => {
  const routePath = Routes[routeName];
  if (!routePath) {
    console.error(`The RouteName must be one of: ${Object.keys(Routes).join(', ')}`);
    return;
  }

  return new Promise((resolve, reject) => {
    const options = {
      url: routePath + buildParams(params),
      success: resolve,
      fail: reject
    };
    if (events) options.events = events;

    method(options);
  });
};

export const switchTab = generateRoute(wx.switchTab);
export const reLaunch = generateRoute(wx.reLaunch);
export const navigateTo = generateRoute(wx.navigateTo);
export const redirectTo = generateRoute(wx.redirectTo);
export default { switchTab, reLaunch, navigateTo, redirectTo };
