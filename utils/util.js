const formatTime1 = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatTime = function formatTime(date) {
  if (typeof (date)=='string'){
    date = new Date(date)
  } 
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
     * 获取格式化日期
     * 20161002
     */
const getFormatDate = function(str) {

  // 拆分日期为年 月 日
  var YEAR = str.substring(0, 4),
    MONTH = str.substring(4, 6),
    DATE = str.slice(-2);

  // 拼接为 2016/10/02 可用于请求日期格式
  var dateDay = YEAR + "/" + MONTH + "/" + DATE;

  // 获取星期几
  var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    day = new Date(dateDay).getDay();

  // 获取前一天日期 根据今天日期获取前一天的日期
  // var dateBefore = new Date( new Date( dateDay ) - 1000 * 60 * 60 * 24 ).toLocaleDateString();
  // var dateBefore = dateBefore.split('/');
  // if( dateBefore[1] < 10 ) {
  //     dateBefore[1] = '0' + dateBefore[1];
  // }
  // if( dateBefore[2] < 10 ) {
  //     dateBefore[2] = '0' + dateBefore[2];
  // }
  // dateBefore = dateBefore.join('');

  return {
    "dateDay": MONTH + "月" + DATE + "日 " + week[day]
  }

}

module.exports = {
  formatTime: formatTime,
  getFormatDate: formatTime
}
