// 复制
/**
 * @param {string} text 需要复制到截切板的字符串
 *
 */
export default function Copy(text) {
  const theClipboard = navigator.clipboard

  if (theClipboard) {
    const promise = theClipboard.writeText(text)
    return promise
  }
  else {
    // 兼容不支持clipboard
    const copyInput = document.createElement('input')// 创建input元素
    document.body.appendChild(copyInput)// 向页面底部追加输入框
    copyInput.setAttribute('value', text)// 添加属性，将url赋值给input元素的value属性
    copyInput.select()// 选择input元素
    document.execCommand('Copy')// 执行复制命令
    copyInput.remove()// 删除动态创建的节点
  }
}
