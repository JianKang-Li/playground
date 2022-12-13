// 获取dom元素,通过css选择器选择
export default function get(option) {
  let doms = document.querySelectorAll(option)
  if (doms.length <= 1) {
    return doms[0]
  } else {
    return doms
  }
}