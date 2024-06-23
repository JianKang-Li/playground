// html字符转换
/**
 * @param {string} str 需要转义的字符串
 * @return {string} 转义后的字符串
 *
 */
export default function Str2Html(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    ' ': '&nbsp;',
  }[m]))
}
