class Local {
  constructor() {
    this.local = localStorage
  }

  add(key, value) {
    return this.local.setItem(key, value)
  }

  remove(key) {
    return this.local.removeItem(key)
  }

  clear() {
    return this.local.clear()
  }

  get(key) {
    return this.local.getItem(key)
  }
}

const input = document.querySelector('#todo')
const container = document.querySelector('#todos')
const local = new Local()

function render() {
  const todos = JSON.parse(local.get('todo'))
  container.innerHTML = ''
  if (todos) {
    const ul = document.createElement('ul')
    Object.keys(todos).forEach(key => {
      const li = document.createElement('li')
      li.innerHTML = `<input type="checkbox" value="${todos[key]}" /><span>${key}</span>`
      ul.appendChild(li)
    })
    container.appendChild(ul)
  }
}

function add() {
  const key = input.value
  let todos = JSON.parse(local.get('todo'))
  if (!todos) {
    todos = {}
  }
  todos[key] = false
  local.add('todo', JSON.stringify(todos))
  render()
}

window.addEventListener('load', () => {
  render()
})