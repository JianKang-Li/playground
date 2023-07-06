// ==UserScript==
// @name         leetcode clean
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.cn/problems/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  window.onload = function () {
    const button = document.createElement('button')
    const body = document.body
    const container = document.querySelector('.flex.h-full.flex-row.gap-8') || document.querySelector('.css-1lexzqe-TabHeaderContainer.e16udao2')
    const list = ['.css-1k63xn3-HeaderCn.e1t1fzqp0', "#__next > div > div > div > nav"]
    let flag = true
    button.innerText = '隐藏'
    button.setAttribute('style', `
    top: 10px;
    left: 20px;
    z-index: 999;
    background: #eee;
    padding: 5px 10px;
    border-radius: 5px;
    `)

    button.addEventListener('click', () => {
      for (const item of list) {
        const ele = document.querySelector(item)

        if (flag && ele) {
          ele.style.display = 'none'
          flag = false
        } else if (ele) {
          ele.style.display = 'block'
          flag = true
        }
      }
    })

    if (container) {
      container.appendChild(button)
    } else {
      button.style.position = 'fixed'
      body.appendChild(button)
    }
  }
})();