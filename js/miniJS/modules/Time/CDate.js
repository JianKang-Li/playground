//获取当前日期并格式化为（YYYY-MM-DD）
export default function CDate() {
  let date = new Date();
  let day =
    date.getFullYear().toString().padStart(4, 0) +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, 0) +
    "-" +
    date.getDate().toString().padStart(2, 0);
  return day;
};