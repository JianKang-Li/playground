// html字符转换
/**
* @param {String} str 需要转义的字符串
* @return {String} 转义后的字符串
* 
**/
export default function Str2Html(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    "&": '&amp;',
    "<": '&lt;',
    '>': "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    " ": "&nbsp;"
  }[m]))
}