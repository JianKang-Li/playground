//获取当前时间并格式化为（hh:mm:ss）
export default function Ctime() {
  let date = new Date();
  let time = date.toTimeString().slice(0, 8)
  return time;
};