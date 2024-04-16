// 时间格式化
export default function timeFromDate(date) {
  return date.toTimeString().slice(0, 8)
}
