var _utcToDate = function (utc) {
  return getDate(utc.slice(0, -5) + 'Z');
};

var _formatNumber = function (num) {
  return +num < 10 ? '0' + num : '' + num;
};

// 关于 getDate 方法的使用
// <https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/06datatype.html#date>
var _getRegularDate = function (date, type) {
  var realDate;
  if (type === 'UTC') {
    realDate = _utcToDate(date);
  } else if (type === 'TimestampByS') {
    realDate = getDate(date * 1000);
  } else if (type === 'TimestampByMS') {
    realDate = getDate(date);
  } else {
    realDate = getDate(date);
  }

  return realDate;
};

var stringifyDate = function (date, type, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!date) return;

  var realDate = _getRegularDate(date, type);

  var date = [
    ['M+', _formatNumber(realDate.getMonth() + 1)],
    ['d+', _formatNumber(realDate.getDate())],
    ['h+', _formatNumber(realDate.getHours())],
    ['m+', _formatNumber(realDate.getMinutes())],
    ['s+', _formatNumber(realDate.getSeconds())],
    ['q+', Math.floor((realDate.getMonth() + 3) / 3)],
    ['S+', realDate.getMilliseconds()]
  ];
  var regYear = getRegExp('(y+)', 'i');
  var reg1 = regYear.exec(format);
  if (reg1) {
    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
  }
  for (var i = 0; i < date.length; i++) {
    var k = date[i][0];
    var v = date[i][1];
    var reg2 = getRegExp('(' + k + ')').exec(format);
    if (reg2) {
      format = format.replace(
        reg2[1],
        reg2[1].length == 1 ? v : ('00' + v).substring(('' + v).length)
      );
    }
  }

  return format;
};

module.exports = {
  stringifyDate: stringifyDate
};
