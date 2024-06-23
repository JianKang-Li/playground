// 函数柯西化
export default function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  else {
    return function (..._args) {
      return curry(fn, ..._args, ...args)
    }
  }
}
