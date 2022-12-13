// 返回当月第一天和最后一天
export default function getFirstLastDay() {
  let now = new Date();
  let y = now.getFullYear();
  let m = now.getMonth();
  let firstDay = new Date(y, m, 1);
  let lastDay = new Date(y, m + 1, 0);
  firstDay = y + "-" + (firstDay.getMonth() + 1) + "-" + "01";
  lastDay = y + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate();
  return [firstDay, lastDay];
}