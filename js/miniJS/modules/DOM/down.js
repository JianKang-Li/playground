// 下载
/**
 * @param {File} file 文件
 * @param {string} filename 文件名
 * @param {string} type 文件类型
 */
export default function down(file, filename = '下载', type) {
  const a = document.createElement('a')
  a.download = filename + type
  a.href = URL.createObjectURL(file)
  document.body.appendChild(a)
  a.click()
  a.remove()
}
