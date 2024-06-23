export default function isInteger(num) {
  // 如果使用bumber类型会丢失精度
  return `${Number.parseInt(num)}` === num
}
