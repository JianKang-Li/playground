// 利用Set去重
/**
* @param {Array} arr 需要去重的数组
* @return {Array} 去重后的新数组
* 
**/
export default function unique(arr) {
  let set = new Set(arr)
  return Array.from(set)
}