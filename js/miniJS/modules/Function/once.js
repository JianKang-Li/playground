export default function once(fn) {
  let first = true
  let result
  return function (...args) {
    if (first) {
      first = false
      result = fn.apply(this, args)
    }
    return result
  }
}
