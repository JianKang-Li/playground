// ==UserScript==
// @name         moon 菜单
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  用于创建操作菜单
// @author       ljk
// @match        https://github.com/Lavender-z/demo/blob/master/%E6%97%8B%E8%BD%AC%E8%8F%9C%E5%8D%95%EF%BC%88css%EF%BC%89/style.css
// @grant        none
// ==/UserScript==
class Moon {
  constructor(items = [], title = '=') {
    this.body = document.body
    this.init(title, items)
    this.style()
    this.initEvent()
  }

  init(title, items) {
    const menu = document.createElement('div')
    const createItem = (i, title) => `<div class="moon-menu-item moon-menu-base" id='ctrl-${title}' data-position="${i}"><span>${title}</span></div>`
    menu.setAttribute('class', 'moon-menu moon-menu-base')
    menu.setAttribute('id', 'moon-menu')
    menu.innerHTML = `
    <div class="title">${title || '='}</div>
    ${items.map((item, index) => createItem(index, item)).join('')}
    `
    this.body.appendChild(menu)
  }

  initEvent() {
    const menu = document.querySelector('#moon-menu .title')

    menu.addEventListener('click', () => {
      const items = document.querySelectorAll('.moon-menu-item')
      items.forEach((item) => {
        item.classList.toggle('active')
        const index = Number.parseInt(item.dataset.position)

        item.style.top = `${-120 + (index + 1) * 40}px`
        item.style.transform = `translateX(${-20 + -50 * (index % 3)}px)`
      })
    })
  }

  style() {
    const style = document.createElement('style')

    style.innerHTML = `
    .moon-menu-base {
      --bg: #6f8792;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg);
      border-radius: 50%;
      cursor: pointer;
      z-index: 999;
      opacity: .9;
    }

    .moon-menu {
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 4em;
      height: 4em;
    }

    .moon-menu-item {
      display: none;
      width: 3em;
      height: 3em;
      padding: 5px;
      position: absolute;
      top: 1em;
      left: 1em;
      z-index: 999;
      transform-origin: bottom right 60px;
    }

    .moon-menu-item.active {
      display: flex;
    }
    `
    this.body.appendChild(style)
  }
}

(function () {
  'use strict'

  window.onload = () => {
    const menu = new Moon(['video', 'picture'])
  }
})()
