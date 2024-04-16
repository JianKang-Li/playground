// 获取当前时间并格式化为（hh:mm:ss）
export default function Ctime() {
  const date = new Date()
  const time = date.toTimeString().slice(0, 8)
  return time
};
