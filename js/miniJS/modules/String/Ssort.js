/**
* @param {Array} arr 字符串数组
* @return {Array} 按字典顺序排好的数组
* 
**/
export default function Ssort(arr) {
  return arr.sort((a, b) => a.localeCompare(b))
}