// 大数相加
export default function addBig(a, b) {
  // 取两个数字的最大长度
  const maxLength = Math.max(a.length, b.length)
  // 用0去补齐长度
  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)
  // 定义加法过程中需要用到的变量
  let t = 0
  let f = 0 // "进位"
  let sum = ''
  for (let i = maxLength - 1; i >= 0; i--) {
    t = Number.parseInt(a[i]) + Number.parseInt(b[i]) + f
    f = Math.floor(t / 10)
    sum = t % 10 + sum
  }
  if (f !== 0)
    sum = `${f}${sum}`

  return sum
}
