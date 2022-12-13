export default function once(fn) {
  let first = true
  let result;
  return function () {
    if (first) {
      first = false
      result = fn.apply(this, arguments)
    }
    return result
  }
}