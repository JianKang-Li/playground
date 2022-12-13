// 节流
export default function throttle(handle, wait = 1000) {
  var lasetTime = 0;
  return function () {
    var nowTime = new Data().getTime();
    if (nowTime - lasetTime > wait) {
      handle.apply(this, arguments);
      lasetTime = nowTime
    }
  }
}