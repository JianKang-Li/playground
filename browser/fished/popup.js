// 定义URL地址
const time = new Date().getTime()
const messageUrl = `https://api.vvhan.com/api/60s?type=json&t=${time}`
const todayUrl = `https://apis.jxcxin.cn/api/lishi?format=json&t=${time}`
const famousUrl = `https://xiaoapi.cn/API/yiyan.php?t=${time}`
const weiboUrl = `http://api.aykeji.cn/test/wb.php?t=${time}`

const body = document.body
const messageDom = document.querySelector('.message')
const todayDom = document.querySelector('.today')
const famousDom = document.querySelector('.famous')
const weiboDom = document.querySelector('.weibo')

function createDom(type) {
  return document.createElement(type)
}

async function Get(url, text) {
  return fetch(url).then(async (res) => {
    return text ? await res.text() : res.json()
  })
}

async function Factory(param) {
  const message = await Get(param.url, param.text)
  const dom = createDom('ul')
  const data = param.path ? message[param.path] : message

  console.log(data)

  if (Array.isArray(data)) {
    for (let item of data) {
      const li = createDom('li')
      li.innerHTML = `<span>${item}</span>`
      dom.appendChild(li)
    }
  } else if (typeof data === 'object') {
    for (let item in data) {
      const li = createDom('li')
      li.innerHTML = `<span>${item}: ${data[item]}</span>`
      dom.appendChild(li)
    }
  } else {
    const li = createDom('li')
    li.innerHTML = `<span>${message}</span>`
    dom.appendChild(li)
  }

  param.container.appendChild(dom)
}

window.addEventListener('load', async () => {
  await Factory({ url: messageUrl, container: messageDom, path: 'data' })
  await Factory({ url: todayUrl, container: todayDom, path: 'content' })
  await Factory({ url: famousUrl, container: famousDom, text: true })
  await Factory({ url: weiboUrl, container: weiboDom })
})