export function toast(message) {
    const body = document.querySelector('body')
    const span = document.createElement('span')
    span.style = 'position: fixed;bottom: 10px;right: 10px;background-color: #ccc;padding: 4.8px 10px;border-radius: 4.8px;z-index:9999'
    span.innerText = message
    body.appendChild(span)
    setTimeout(() => {
      span.remove()
    }, 1000)
  }
