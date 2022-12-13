// 获取数据类型
export default function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}