// 字符统计
export default function Scount(str) {
  return str.split('').reduce((a, b) => (a[b]++ || (a[b] = 1), a), {})
}
