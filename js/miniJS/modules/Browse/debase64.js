/**
 * @param {string} text 需要转换成的base64字符串
 * @return {string} 转换后的字符串
 *
 */
export default function debase64(text) {
  return window.atob(text)
}
