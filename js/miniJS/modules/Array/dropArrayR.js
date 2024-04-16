// 右切片
/**
 * @param {Array} arr 需要切片的数组
 * @param {number} n 需要去除前几个数据
 * @return {Array} 切割后的新数组
 */
export default function dropArrayR(arr, n = 1) {
  return arr.slice(0, -n)
}
