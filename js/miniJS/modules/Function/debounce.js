// 防抖
export default function debounce(handle, delay = 1000) {
  let timer = null
  return function () {
    const _self = this
    const _args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      handle.apply(_self, _args)
    }, delay)
  }
}

/*
节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
*/
