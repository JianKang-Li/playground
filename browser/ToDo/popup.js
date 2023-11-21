const input = document.querySelector('#todo')
const addBtn = document.querySelector('#addBtn')
const container = document.querySelector('#todos')
const clean = document.querySelector('#clean')
const local = chrome.storage.local

function render() {
  local.get('todo', res => {
    const todos = res.todo
    container.innerHTML = ''

    if (todos) {
      const ul = document.createElement('ul')

      ul.setAttribute('class', 'lists')
      Object.keys(todos).forEach(key => {
        const li = document.createElement('li')
        li.innerHTML = `<input type="checkbox" data-key="${key}" id="li_${key}"/><span>${key}</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="delete" data-key="${key}"/>`
        ul.appendChild(li)
      })
      container.appendChild(ul)
      Object.keys(todos).forEach(key => {
        const li = document.querySelector(`#li_${key}`)

        if (todos[key]) {
          li.checked = true
        }
      })
      addEvent()
    }
  })
}

function addEvent() {
  const ul = document.querySelector('.lists')

  ul.addEventListener('click', (e) => {
    if (!e.target.classList.value.includes('delete')) {
      const key = e.target.dataset['key']
      const value = e.target.checked

      local.get('todo', res => {
        let todos = {}
        Object.keys(res.todo).forEach(item => {
          todos[item] = res.todo[item]
        })

        todos[key] = value
        local.set({ 'todo': todos })
      })
    } else {
      const key = e.target.dataset['key']

      local.get('todo', res => {
        let todos = res.todo

        delete todos[key]
        local.set({ 'todo': todos }, () => {
          render()
        })
      })
    }
  })
}

function add() {
  local.get('todo', res => {
    const key = input.value
    let todos = res.todo

    if (!todos) {
      todos = {}
    }
    todos[key] = false
    local.set({ 'todo': todos }, () => {
      render()
      input.value = ''
    })
  })
}

addBtn.addEventListener('click', add)
clean.addEventListener('click', () => {
  local.clear()
  render()
})
window.addEventListener('load', () => {
  render()
})