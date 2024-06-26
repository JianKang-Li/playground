// 快速排序
export function quickSort(arr) {
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

// 利用Set去重
export function unique(arr) {
  const set = new Set(arr)
  return Array.from(set)
}

// 时间格式化
export function timeFromDate(date) {
  return date.toTimeString().slice(0, 8)
}

// 数组对象去重
export function uniqueArrayObject(arr = [], key) {
  if (arr.length === 0)
    return
  let list = []
  const map = {}
  arr.forEach((ele) => {
    if (!map[ele[key]])
      map[ele[key]] = ele
  })
  list = Object.values(map)
  return list
}
