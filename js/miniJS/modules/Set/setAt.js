// 获取位置的元素
export default function setAt(set, item) {
  const arr = Array.from(set)
  return arr.at(item)
}