// 将json文件转成字符串

module.exports = function (content) {
  return `export default ${JSON.stringify(content)}`
}
