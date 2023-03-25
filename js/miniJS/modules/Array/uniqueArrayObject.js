// 数组对象去重
/** 
* @param {Array} arr 需要去重的对象数组
* @param {String} key 去重关键字
* @return {Array} 根据传入关键字去除具有相同值对象后的对象数组
**/
export default function uniqueArrayObject(arr = [], key) {
  if (arr.length === 0) return;
  let list = [];
  let map = {};
  arr.forEach((ele) => {
    if (!map[ele[key]]) {
      map[ele[key]] = ele;
    }
  });
  list = Object.values(map);
  return list;
}
let arr = [{ name: 'ljk' }, { name: 'ljk' }, { name: 'jk' }]
console.log(uniqueArrayObject(arr, 'name'))