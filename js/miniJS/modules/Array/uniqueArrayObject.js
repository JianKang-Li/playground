// 数组对象去重
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