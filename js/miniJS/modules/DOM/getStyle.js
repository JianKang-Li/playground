// 获取元素样式
export default function getStyle(dom, prop) {
  if (window.getComputedStyle)
    return window.getComputedStyle(dom, null)[prop]
  else
    return dom.currentStyle[prop]
}
