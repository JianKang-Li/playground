// 是否都满足条件
export default function setEvery(set, callback) {
  if (!(set instanceof Set)) {
    throw new TypeError('This method applies to Set.')
  }
  else {
    const arr = Array.from(set)
    return arr.every(callback)
  }
}
