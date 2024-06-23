// 浮点数运算，解决0.1+0.2!=0.3
export default function float(args) {
  return Number.parseFloat((args).toFixed(10))
}
