const show = document.querySelector('#show')
const codes = document.querySelector('#code')
const run = document.querySelector('#run')
const cleanBtn = document.querySelector('#clean')
const copyBtn = document.querySelector('#copy')

const tab = '  '
const tabLen = tab.length

function runCode() {
  show.innerHTML = ''
  const console = {}
  console.log = function (...args) {
    show.innerHTML += '> '
    for (let i = 0; i < args.length; i++) {
      if (!(args[i] instanceof Error) && typeof args[i] === 'object')
        show.innerHTML += JSON.stringify(args[i])
      else
        show.innerHTML += args[i]

      show.innerHTML += ' '
    }
    show.innerHTML += '\n'
  }
  try {
    /* eslint no-eval: 0 */
    eval(codes.value)
  }
  catch (e) {
    console.log(e)
  }
}

function clean() {
  show.innerHTML = ''
  codes.value = ''
}

// 支持tab键
codes.addEventListener('keydown', event => dealTab(event))

function removeTab(text, start, end) {
  const singleLine = typeof end === 'undefined'
  const beforeText = text.substring(0, start)
  const endBeforeText = text.substring(0, end)
  const lines = text.split('\n')
  const startLineNumber = beforeText.split('\n').length - 1
  const endLineNumber = endBeforeText.split('\n').length - 1
  let newText = ''
  let startNumber = 0
  let endNumber = 0

  function remove(text) {
    const reg = new RegExp(`^${tab}`)
    return text.replace(reg, '')
  }
  if (singleLine) {
    const oldLine = lines[startLineNumber]
    lines[startLineNumber] = remove(lines[startLineNumber])

    if (oldLine !== lines[startLineNumber]) {
      startNumber = beforeText.length - tabLen
      endNumber = beforeText.length - tabLen
    }
  } else {
    endNumber = endBeforeText.length
    for (let i = startLineNumber; i <= endLineNumber; i++) {
      const oldLine = lines[i]
      lines[i] = remove(lines[i])

      if (oldLine !== lines[i]) {
        if (i === startLineNumber) {
          if (!text.substring(start, end).startsWith(tab)) {
            startNumber = beforeText.length - tabLen
          } else {
            startNumber = start
          }
        }
        endNumber = endNumber - tabLen
      }
    }
  }
  newText = lines.join('\n')

  return [newText, startNumber, endNumber]
}

function dealTab(e) {
  const obj = codes
  const start = obj.selectionStart
  const end = obj.selectionEnd
  let text = obj.value
  const selectionText = text.substring(start, end)

  if (e.shiftKey && e.key === 'Tab') {
    let newStart = 0
    let newEnd = 0
    if (start === end) {
      [text, newStart, newEnd] = removeTab(text, start)
      obj.value = text
    }
    else {
      [text, newStart, newEnd] = removeTab(text, start, end)
    }

    obj.value = text
    obj.selectionStart = newStart
    obj.selectionEnd = newEnd
    e.preventDefault()
  }
  else if (e.key === 'Tab') {
    if (start === end) {
      text = text.substring(0, start) + tab + text.substring(end)
      obj.value = text
      // 防止光标跳到最后
      obj.selectionStart = start + tabLen
      obj.selectionEnd = start + tabLen
    }
    else if (selectionText.includes('\n')) {
      const arr = selectionText.split('\n')
      let str = text.substring(0, start)
      let count = 0
      for (let i = 0; i < arr.length; i++) {
        str += `${tab + arr[i]}\n`
        count++
      }
      // 去掉最后一个换行
      str = str.substring(0, str.length - 1)
      str += text.substring(end)
      obj.value = str
      obj.selectionStart = end + count * tabLen
      obj.selectionEnd = end + count * tabLen
    }
    else {
      text
        = text.substring(0, start)
        + tab
        + selectionText
        + text.substring(end)
      obj.value = text
      obj.selectionStart = start + tabLen
      obj.selectionEnd = start + tabLen
    }
    e.preventDefault()
  }
}

function copy() {
  const code = codes.value
  if (navigator.clipboard) {
    const theClipboard = navigator.clipboard
    if (!code.trim()) {
      $Tip.info('无代码可复制!')
      return
    }
    const promise = theClipboard.writeText(code)
    promise.then(
      () => {
        $Tip.success('复制成功!')
      },
      (err) => {
        $Tip.error('复制失败!', err)
      },
    )
  }
  else {
    // 兼容不支持clipboard
    const copyInput = document.createElement('input') // 创建input元素
    document.body.appendChild(copyInput) // 向页面底部追加输入框
    copyInput.setAttribute('value', code) // 添加属性，将url赋值给input元素的value属性
    copyInput.select() // 选择input元素
    document.execCommand('Copy') // 执行复制命令
    $Tip.success('复制成功！')
    copyInput.remove() // 删除动态创建的节点
  }
}

copyBtn.addEventListener('click', () => {
  copy()
})

cleanBtn.addEventListener('click', () => {
  clean()
})
run.addEventListener('click', () => {
  runCode()
})

class Tip {
  constructor() {
    this.div = document.createElement('div')
    this.div.className = 'tipContainer'
    document.body.appendChild(this.div)
  }

  success(msg) {
    const span = document.createElement('div')
    span.classList.add('tip')
    span.classList.add('btn-success')
    span.textContent = msg
    this.div.appendChild(span)
    setTimeout(() => {
      span.remove()
    }, 2000)
  }

  error(msg) {
    const span = document.createElement('div')
    span.classList.add('tip')
    span.classList.add('btn-error')
    span.textContent = msg
    this.div.appendChild(span)
    setTimeout(() => {
      span.remove()
    }, 2000)
  }

  info(msg) {
    const span = document.createElement('div')
    span.classList.add('tip')
    span.textContent = msg
    this.div.appendChild(span)
    setTimeout(() => {
      span.remove()
    }, 2000)
  }
}

window.$Tip = new Tip()
