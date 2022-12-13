//  只要有一个满足条件
export default function setSome(set, callback) {
  if (!(set instanceof Set)) {
    throw Error('This method applies to Set.')
  }
  else {
    const arr = Array.from(set)
    return arr.some(callback)
  }
}