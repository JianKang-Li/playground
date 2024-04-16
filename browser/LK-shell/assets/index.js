const input = document.querySelector('#input')
const searchbar = document.querySelector('.searchbar')

// 默认配置
let LKWebShell = {
  bg: '#000',
  fontSize: '1rem',
  bookmarks: {},
  defaultSource: 'google',
  openInNew: false,
  search_source: {
    baidu: 'http://baidu.com/s?wd=',
    baidukf: 'https://kaifa.baidu.com/searchPage?wd=',
    npm: 'https://www.npmjs.com/search?q=',
    juejin: 'https://juejin.cn/search?query=',
    github: 'https://github.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    google: 'https://www.google.com/search?q=',
  },
}

// 操作localStorage
class Local {
  set(key, value) {
    return localStorage.setItem(key, value)
  }

  get(key) {
    return localStorage.getItem(key)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

const local = new Local()
const search_source = LKWebShell.search_source
// 搜索实现
function search(key, source) {
  const sourceUrl = search_source[source] || search_source[LKWebShell.defaultSource]
  const href = `${sourceUrl}${key}`

  if (sourceUrl) {
    if (LKWebShell.openInNew)
      window.open(href)
    else
      window.location.href = href
  }
  else {
    print(`Can't identify the search source at ${source}`, 'red')
  }
}

// 输出到屏幕
function print(text, color = '#fff') {
  const div = document.createElement('div')
  div.className = 'print'
  div.style.color = color
  div.innerHTML = text
  document.body.insertBefore(div, searchbar)
  div.scrollIntoView()
}

// 获取输入历史
function getHistory(index) {
  const len = commandStack.length - 1
  if (index < 0)
    commandIndex = 0
  else if (index > len)
    commandIndex = len + 1
  else
    commandIndex = index

  return commandStack[commandIndex] || ''
}

let flag = true

input.addEventListener('compositionstart', () => {
  flag = false
})

input.addEventListener('compositionend', () => {
  flag = true
})
// 事件监听
window.addEventListener('keyup', (e) => {
  input.focus()
  if (flag) {
    if (e.code === 'Enter') {
      print(`>&nbsp;&nbsp;&nbsp;${input.value}`)
      Analysis()
      input.value = ''
    }
    else if (e.code === 'ArrowUp') {
      const val = getHistory(commandIndex - 1)
      input.value = val
      setTimeout(() => {
        input.selectionStart = input.value.length
        input.selectionEnd = input.value.length
      })
    }
    else if (e.code === 'ArrowDown') {
      input.value = getHistory(commandIndex + 1)
    }
  }
})

function init() {
  const LK = local.get('LKWebShell') || LKWebShell
  LKWebShell = typeof LK === 'string' ? JSON.parse(LK) : LK
  console.warn(LKWebShell)
  for (const key in LKWebShell) {
    switch (key) {
      case 'bg': {
        if (LKWebShell.bg.includes('http'))
          document.body.style.background = `url(${LKWebShell.bg})`
        else
          document.body.style.background = LKWebShell.bg

        break
      }
      default: {
        // console.log(key, LKWebShell[key]);
      }
    }
  }
}

window.onload = function () {
  init()
}
