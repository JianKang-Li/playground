// 节流
export default function throttle(handle, wait = 1000) {
  let lasetTime = 0
  return function (...args) {
    const nowTime = new Data().getTime()
    if (nowTime - lasetTime > wait) {
      handle.apply(this, args)
      lasetTime = nowTime
    }
  }
}
