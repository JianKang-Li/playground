// html字符转换
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