function notify({ message = 'Tip', position = 'right', delay = 5 }) {
  function objToStr(obj) {
    let text = ''
    Object.keys(obj).forEach(key => {
      text += `${key}: ${obj[key]};`
    })

    return text
  }

  const body = document.body
  const span = document.createElement('span')
  span.style = objToStr({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    'background-color': '#eee',
    padding: '4.8px 10px',
    'border-radius': '4.8px',
    'z-index': 9999,
    'box-shadow': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
  })
  span.textContent = message
  body.appendChild(span)
  setTimeout(() => {
    span.remove()
  }, delay * 1000)
}

window.notify = notify
