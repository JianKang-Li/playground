// 对象深度冻结
export default function deepFreeze(obj, attr, deep = 0) {
  const re = function (obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object')
          deepFreeze(obj, key, 1)
      }
    }
  }
  if (attr === undefined) {
    Object.freeze(obj)
    re(obj)
  }
  else {
    if (typeof obj[attr] !== 'object') {
      Object.defineProperty(obj, attr, {
        writable: false,
      })
      return
    }
    Object.freeze(deep === 1 ? obj[attr] : obj)
    re(obj[attr])
  }
}
