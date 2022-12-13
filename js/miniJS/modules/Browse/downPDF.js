// 打印PDF
export default function downPDF(container) {
  const style = document.createElement('style')
  style.innerHTML = `@media print {
      @page {
        margin: 0;
      }

      body {
        margin: 2.54cm 1.91cm;
      }

      body> :not(${container}) {
        display: none;
      }
    }`

  const div = document.querySelector(container)
  let old = document.body.innerHTML
  document.body.innerHTML = ''
  document.body.appendChild(style)
  document.body.appendChild(div)
  window.print()
  document.body.innerHTML = old
}