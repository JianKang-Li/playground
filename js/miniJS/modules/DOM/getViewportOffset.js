// 获取窗口大小
export default function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: wind.innerWidth,
      h: window.innerHeight,
    }
  }
  else {
    if (document.compatMode === 'BackCompat') {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      }
    }
    else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight,
      }
    }
  }
}
