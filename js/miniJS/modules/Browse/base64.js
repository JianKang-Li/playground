/**
 * @param {string} text 需要转换成base64的字符串
 * @return {string} 转换后的字符串
 *
 */
export default function base64(text) {
  return window.btoa(text)
}
