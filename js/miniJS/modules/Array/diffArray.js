// 数组之间去重
export default function diffArray(arr1, arr2) {
  let newArr = []
  arr1.map((item) => {
    if (arr2.indexOf(item) === -1) {
      newArr.push(item)
    }
  })
  return newArr
}