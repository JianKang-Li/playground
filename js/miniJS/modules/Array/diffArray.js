// 数组之间去重
/**
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @return {Array} 第一个数组中不在第二个数组中的项组成的新数组
 */
export default function diffArray(arr1, arr2) {
  const newArr = []
  arr1.forEach((item) => {
    if (!arr2.includes(item))
      newArr.push(item)
  })
  return newArr
}
