// 比较两个日期之间差的天数
export default function dayDif(date1, date2) {
  if (typeof date1 === 'number') {
    date1 = new Date(date1)
  }
  if (typeof date2 === 'number') {
    date2 = new Date(date2)
  }
  let start = new Date(`${date1.getFullYear()}-${date1.getMonth()}-${date1.getDate()}`)
  let end = new Date(`${date2.getFullYear()}-${date2.getMonth()}-${date2.getDate()}`)
  return Math.ceil(Math.abs(start.getTime() - end.getTime()) / 86400000)
}