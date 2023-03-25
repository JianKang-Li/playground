// 移除
/**
* @param {Array} arr 需要移除的原数组
* @param {Number|String|Object|Function} fn 需要移除的元素或判断方法
* 
**/
export default function ArrayRemove(arr, fn) {
  if ((typeof fn == "number") || (typeof fn == "string") || (typeof fn == "object")) {
    arr.forEach((item, index) => {
      if (item === fn) {
        arr.splice(index, 1)
      }
    })
  } else if (typeof fn == 'function') {
    arr.forEach((item, index) => {
      if (Boolean(fn(item))) {
        arr.splice(index, 1)
      }
    })
  }
  else {
    console.error("ArrayRemove expect to receive a number or method or string!");
  }
}