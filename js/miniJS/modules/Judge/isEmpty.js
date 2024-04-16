// 判断对象是否为空
export default function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object
}
