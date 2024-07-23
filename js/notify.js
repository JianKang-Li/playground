function notify(options = { message: 'Tip', position: 'right', delay: 5, type: 'success' }) {
  function objToStr(obj) {
    let text = ''
    Object.keys(obj).forEach(key => {
      text += `${key}: ${obj[key]};`
    })

    return text
  }

  const body = document.body
  const span = document.createElement('span')
  const typeColors = {
    primary: '#1089ff',
    success: '#52c41a',
    warning: '#fea638',
    danger: '#ff4d4f',
    default: '#35495E'
  }

  span.style = objToStr({
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    'background-color': typeColors[options.type],
    padding: '4.8px 10px',
    'border-radius': '4.8px',
    'z-index': 9999,
    'box-shadow': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
  })
  span.textContent = options.message
  body.appendChild(span)
  setTimeout(() => {
    span.remove()
  }, options.delay * 1000)
}

window.notify = notify
