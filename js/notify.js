function notify({message='Tip', position='right'}) {
  const body = document.body
  const span = document.createElement('span')
  span.style = `position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #eee;
  padding: 4.8px 10px;
  border-radius: 4.8px;
  z-index:9999;
  box-shadow': '0 4px 12px 0 rgba(0, 0, 0, 0.05);
  `
  span.innerText = message
  body.appendChild(span)
  setTimeout(() => {
    span.remove()
  }, 1000)
}

export default notify