// 返回当月第一天和最后一天
export default function getFirstLastDay() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  let firstDay = new Date(y, m, 1)
  let lastDay = new Date(y, m + 1, 0)
  firstDay = `${y}-${firstDay.getMonth() + 1}-` + `01`
  lastDay = `${y}-${lastDay.getMonth() + 1}-${lastDay.getDate()}`
  return [firstDay, lastDay]
}
