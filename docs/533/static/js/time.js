// 获取 DOM 元素
const domYearMonthDay = document.querySelector('.year-month-day');
const domHourMinSec = document.querySelector('.hour-minut-second');
const domWeek = document.querySelector('.week');
const domLunar = document.querySelector('.lunar');
const weekObj = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  0: '日',
};

// 定义一个函数来更新时间
function updateTime() {
  const now = new Date();
  const lunarDate = Solar.fromDate(now).getLunar().toString();
  const times = dayjs().format('YYYY年MM月DD日 HH:mm:ss').split(' ');
  const weekDay = dayjs().day(); // 获取星期几（0-6，0 表示星期日）
  const weekText = `星期${weekObj[weekDay]}`;

  // 更新 DOM
  domYearMonthDay.textContent = times[0];
  domHourMinSec.textContent = times[1];
  domWeek.textContent = weekText;

  // 根据星期几设置颜色
  domWeek.className = `week week-${weekDay}`;
  domLunar.textContent = lunarDate;
}

// 每秒更新时间
setInterval(updateTime, 1000);

// 初始化时间
updateTime();


//  运行时间
function NewDate(str) {
  str = str.split('-');
  var date = new Date();
  date.setUTCFullYear(str[0], str[1] - 1, str[2]);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function momxc() {
  var birthDay = NewDate("2023-11-11");
  var today = new Date();
  var timeold = today.getTime() - birthDay.getTime();
  var sectimeold = timeold / 1000
  var secondsold = Math.floor(sectimeold);
  var msPerDay = 24 * 60 * 60 * 1000;
  var e_daysold = timeold / msPerDay;
  var daysold = Math.floor(e_daysold);
  var e_hrsold = (daysold - e_daysold) * -24;
  var hrsold = Math.floor(e_hrsold);
  var e_minsold = (hrsold - e_hrsold) * -60;
  var minsold = Math.floor((hrsold - e_hrsold) * -60);
  var seconds = Math.floor((minsold - e_minsold) * -60).toString();
  document.getElementById("momk").innerHTML = "本站已安全运行" + daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒";
  setTimeout(momxc, 1000);
}
momxc();