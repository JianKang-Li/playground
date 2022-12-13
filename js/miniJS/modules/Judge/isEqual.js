// 判断是否相等
export default function isEqual(value1, value2) {
  return Object.is(value1, value2)
}