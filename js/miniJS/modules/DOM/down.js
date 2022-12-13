// 下载
export default function down(file, filename = '下载', type) {
  let a = document.createElement('a')
  a.download = filename + type;
  a.href = URL.createObjectURL(file)
  document.body.appendChild(a)
  a.click()
  a.remove()
}
