// 深度复制
export default function dpClone(target, map = new Map()) {
  if (target.constructor === Date)
    return new Date(target)

  if (target.constructor === RegExp)
    return new RegExp(target)

  if (target instanceof Error)
    return new Error(target.message)
  if (target instanceof Function) {
    return function proxy(...args) {
      return target.call(this, args)
    }
  }
  if (typeof target != 'object')
    return target
  if (map.has(target))
    return map.get(target)
  const newObj = new target.constructor()
  map.set(target, newObj)
  for (const key in target) {
    if (target.hasOwnProperty(key))
      newObj[key] = dpClone(target[key], map)
  }
  return newObj
};
