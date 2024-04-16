// 阶乘
export default function factorial(n) {
  const a = [1]
  for (let i = 1; i <= n; i++) {
    for (let j = 0, c = 0; j < a.length || c != 0; j++) {
      const m = j < a.length ? a[j] * i + c : c
      a[j] = m % 10
      c = (m - a[j]) / 10
    }
  }
  return a.reverse().join('')
}
