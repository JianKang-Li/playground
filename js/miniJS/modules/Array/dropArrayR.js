// 右切片
export default function dropArrayR(arr, n = 1) {
  return arr.slice(0, -n)
}