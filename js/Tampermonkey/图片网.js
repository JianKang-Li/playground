// ==UserScript==
// @name         图片网站优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://meirentu.cc/pic/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meirentu.cc
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  window.onload = function () {
    const imgs = document.querySelectorAll('img')
    const btn = document.createElement('button')
    btn.style = "cursor: pointer;position: fixed;top: 95px;left: 10px;border: none;border-radius: 5px;background-color: #ccc;color: #fff;z-index:900;padding: 5px 10px;"
    btn.innerText = '预览'
    const body = document.body
    const container = document.createElement('div')
    container.id = 'show'
    container.style = "border-radius: 10px;justify-content: space-around;background-color:#fff;position: fixed;top: 90px;left: 60px;display: none;align-items: center;flex-wrap: wrap;width: 600px;height: 200px;overflow-y: scroll;z-index:100;"
    for (let key of imgs) {
      const img = document.createElement('img')
      img.src = key.src
      img.style = 'width:120px;height:200px;object-fit:contain;cursor: pointer;'
      img.addEventListener('click', () => {
        window.open(img.src)
      })
      container.appendChild(img)
    }
    btn.addEventListener('click', () => {
      const container = document.querySelector("#show")
      container.style.display = container.style.display === 'none' ? 'flex' : 'none'
    })
    body.appendChild(container)
    body.appendChild(btn)
  }
})();