// 清除js中的console.log()

module.exports = function (content) {
  return content.replace(/console\.log\(.*\);?/g, "")
}