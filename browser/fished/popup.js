const messageUrl = 'https://api.vvhan.com/api/60s?type=json'
const body = document.body

function createDom(type) {
  return document.createElement(type)
}

async function Get(url) {
  return fetch(url).then(async (res) => {
    return await res.json()
  })
}

async function Message() {
  const message = await Get(messageUrl)
  const dom = createDom('ul')

  for (let item of message.data) {
    const li = createDom('li')
    li.innerHTML = `<span>${item}</span>`
    dom.appendChild(li)
  }

  body.appendChild(dom)
}

window.addEventListener('load', async () => {
  await Message()
})