// ==UserScript==
// @name         图片网站优化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://meirentu.cc/pic/*
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meirentu.cc
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  window.onload = function () {
    const btn = document.createElement('button')
    btn.style = 'cursor: pointer;position: fixed;top: 95px;left: 10px;border: none;border-radius: 5px;background-color: #ccc;color: #fff;z-index:900;padding: 5px 10px;'
    btn.textContent = '预览'
    const body = document.body
    const container = document.createElement('div')
    container.id = 'show'
    container.style = 'border-radius: 10px;justify-content: space-around;background-color:#fff;position: fixed;top: 90px;left: 60px;display: none;align-items: center;flex-wrap: wrap;width: 600px;height: 200px;overflow-y: scroll;z-index:100;'

    function getImgs() {
      container.innerHTML = ''
      const imgs = new Set(Array.from(document.querySelectorAll('img')))
      const videos = new Set(Array.from(document.querySelectorAll('video')))
      for (const key of imgs) {
        const img = document.createElement('img')
        img.src = key.src
        img.style = 'width:120px;height:200px;object-fit:contain;cursor: pointer;'
        img.addEventListener('click', () => {
          window.open(img.src)
        })
        container.appendChild(img)
      }
      for (const key of videos) {
        const video = document.createElement('video')
        video.src = key.src
        video.style = 'width:120px;height:200px;object-fit:contain;cursor: pointer;'
        video.addEventListener('click', () => {
          window.open(video.src)
        })
        container.appendChild(video)
      }
    }

    btn.addEventListener('click', () => {
      getImgs()
      const container = document.querySelector('#show')
      container.style.display = container.style.display === 'none' ? 'flex' : 'none'
    })
    body.appendChild(container)
    body.appendChild(btn)

    if (window.location.href.includes('https://meirentu.cc/pic/')) {
      const btn1 = document.createElement('button')
      btn1.textContent = '下一页'
      btn1.style = 'cursor: pointer;position: fixed;top: 125px;left: 10px;border: none;border-radius: 5px;background-color: #ccc;color: #fff;z-index:900;padding: 5px 10px;'
      btn1.addEventListener('click', () => {
        const href = window.location.href
        const arr = href.split('-')
        const num = arr.length === 2 ? Number.parseInt(arr[1]) : 1
        const next = num + 1
        if (next === 2)
          window.location.href = `${arr[0].slice(0, arr[0].length - 5)}-${next}.html`
        else
          window.location.href = `${arr[0]}-${next}.html`
      })
      body.appendChild(btn1)
    }
  }
})()
