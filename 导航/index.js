const links = document.querySelectorAll('a')
links.forEach(a => {
  a.target = "_black"
  a.setAttribute('title', a.innerText)
})


function createMenu() {
  const h3s = document.querySelectorAll('h3')
  const menu = document.createElement('div')
  menu.setAttribute('id', 'menu')
  h3s.forEach((h3) => {
    h3.setAttribute('id', h3.innerText)
    const div = document.createElement('div')
    div.innerHTML = `<a href="#${h3.innerText}">${h3.innerText}</a>`
    div.className = 'menu_item'
    menu.appendChild(div)
  })
  document.body.appendChild(menu)
}

window.oncontextmenu = function (e) {
  const menu = document.querySelector('#menu')
  e.preventDefault();
  menu.style.display = 'flex'
  // menu.style.left = e.pageX + 'px'
  // menu.style.top = e.pageY + 'px'
}

window.addEventListener('click', () => {
  menu.style.display = 'none'
})

createMenu()
