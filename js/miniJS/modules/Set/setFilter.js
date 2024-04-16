// 过滤
export default function setFilter(set, condition) {
  const nset = new Set()
  if (isFunction(condition)) {
    set.forEach((item, key, set) => {
      if (condition(item, key, set))
        nset.add(item)
    })
  }
  else if (isArray(condition)) {
    set.forEach((item) => {
      if (!condition.includes(item))
        nset.add(item)
    })
  }
  else {
    set.forEach((item) => {
      if (item !== condition)
        nset.add(item)
    })
  }
  return nset
}
