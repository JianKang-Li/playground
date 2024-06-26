// 快速排序
/**
 * @param {Array} arr 需要排序的数组
 * @return {Array} 排序完成的数组
 *
 */
export default function quickSort(arr) {
  if (!Array.isArray(arr))
    return
  if (arr.length <= 1)
    return arr
  const left = []
  const right = []
  const num = Math.floor(arr.length / 2)
  const numValue = arr.splice(num, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > numValue)
      right.push(arr[i])
    else
      left.push(arr[i])
  }
  return [...quickSort(left), numValue, ...quickSort(right)]
}
