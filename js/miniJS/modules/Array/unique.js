// 利用Set去重
export default function unique(arr) {
  let set = new Set(arr)
  return Array.from(set)
}