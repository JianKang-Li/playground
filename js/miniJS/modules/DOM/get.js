// 获取dom元素,通过css选择器选择
/**
 * @param {string} option css选择器
 * @return {Array|Element} 获取到的元素
 *
 */
export default function get(option) {
  const doms = document.querySelectorAll(option)
  if (doms.length <= 1)
    return doms[0]
  else
    return doms
}
