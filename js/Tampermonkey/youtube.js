// ==UserScript==
// @name         Youtube优化
// @namespace    http://tampermonkey.net/
// @version      0.0.6
// @description  youtube优化
// @author       ljk

// @match      *.youtube.com/*
// @match      *.instagram.com/*

// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";

  /* 实现新标签页打开链接 */
  function kidnap() {
    function selectAll() {
      return document.querySelectorAll("a")
    }

    function selectV(tag) {
      const arr = Array.from(document.querySelectorAll(`${tag} a`))
      return arr
    }

    function Open(e, href) {
      const video = document.querySelector('video')
      video && video.pause()
      e.preventDefault();
      e.stopPropagation()
      window.open(href)
      return false
    }

    const exclude = ['#sections > ytd-guide-section-renderer:nth-child(1)', "ytd-masthead", "#items > ytd-guide-collapsible-entry-renderer", "#content > ytd-mini-guide-renderer"]
    let excludes = []
    for (let i = 0; i < exclude.length; i++) {
      let items = selectV(exclude[i])
      excludes = excludes.concat(items)
    }

    const list = Array.from(selectAll()).filter(item => !excludes.includes(item))

    list.forEach((item) => {
      item.setAttribute('target', "_blank")
      const url = item.getAttribute("href")
      item.onclick = (e) => {
        Open(e, url)
      }
    })

  }

  function debounce(fn, delay) {
    let timer = null
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  window.onload = function () {
    // 初始劫持
    kidnap()
    // 等待加载完成劫持
    setTimeout(() => {
      kidnap()
    }, 500)
    // 页面滚动劫持
    const dekidnap = debounce(kidnap, 300)

    /* 实现视频按钮添加下载 */
    const button = document.createElement('button')
    button.setAttribute('style', `
    border: 0px;
    padding: 1rem 1rem;
    border-radius: 1.3rem;
    font-size: 1rem;
    margin-left: 0.3rem;
    cursor: pointer;
    `)

    button.setAttribute('id', "lkdown")
    button.onclick = function () {
      const href = window.location.href
      const clip = navigator.clipboard
      const video = document.querySelector('video')
      video.pause()
      clip.writeText(href).then((res) => {
        setTimeout(() => {
          window.open("https://www.y2mate.com/en346/download-youtube")
        }, 300)
      }, error => {
        console.log(error);
      })

    }
    button.innerText = 'Download'

    window.addEventListener('scroll', () => {
      dekidnap()
      if (/\*\.youtube\.com\//.test(window.location.href)) {
        let actions = document.querySelector("#actions")
        if (!document.querySelector('#lkdown') && /watch\?/.test(window.location.href)) {
          actions.insertBefore(button, actions.firstChild)
        }
      }
    })
  }
})();
