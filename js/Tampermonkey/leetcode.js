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
  'use strict'
  window.onload = function () {
    const body = document.body
    // 自定义样式类兼容旧版
    const style = document.createElement('style')
    style.innerHTML = `
    .jk-flex-col {
      display: flex;
      flex-direction: column;
      width: fit-content;
    }

    .jk-flex-row {
      display: flex;
      flex-direction: row;
    }
    `

    body.appendChild(style)
    // 讨论栏
    const container = document.querySelector('#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div:nth-child(1) > div > div') || document.querySelector('.css-1lexzqe-TabHeaderContainer.e16udao2') || document.querySelector('#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div:nth-child(1)')
    // 左侧题目栏
    const leftContain = document.querySelector('#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div') || document.querySelector('.css-11zaw7c-TabView')
    // 旧版tab容器
    const div = document.querySelector('#question-detail-main-tabs > div.css-1hbqv5m-TabViewHeader.e16udao1')
    // 隐藏元素列表
    const list = ['.css-1k63xn3-HeaderCn.e1t1fzqp0', '#__next > div > div > div > nav', '#lc-home > div > div.main__1pRE > div.css-wfkj6v-Content.e1aolq224 > div > div.css-1gcn2k5-RightContainer.e1aolq221 > div > div.css-w8jsc9-EditorContainer.ejldciv1 > div > div.container__39KX > div.second-section-container__2cAh > div.css-ontzvu-MockInterviewContainer.e3jm4na1 > div.css-1mu9tzo-WideContainer.e3jm4na3']
    // 隐藏标志
    let flag = true

    // 自定义按钮
    const button = document.createElement('button')
    button.textContent = 'vscode'
    button.setAttribute('style', `
    z-index: 999;
    padding: 5px 5px;
    border-radius: 5px;
    background: #f7f7f7;
    border: none;
    `)

    button.addEventListener('click', () => {
      if (flag) {
        for (const item of list) {
          const ele = document.querySelector(item)
          ele && (ele.style.display = 'none')
        }
        container && container.classList.add('jk-flex-col')
        container && container.classList.remove('jk-flex-row')
        leftContain && leftContain.classList.remove('jk-flex-col')
        leftContain && leftContain.classList.add('jk-flex-row')
        div && (div.style.width = 'fit-content')
        flag = false
      }
      else {
        for (const item of list) {
          const ele = document.querySelector(item)
          ele && (ele.style.display = 'block')
        }
        container && container.classList.remove('jk-flex-col')
        container && container.classList.add('jk-flex-row')
        leftContain && leftContain.classList.add('jk-flex-col')
        leftContain && leftContain.classList.remove('jk-flex-row')
        div && (div.style.width = '100%')
        flag = true
      }
    })

    if (container) {
      container.appendChild(button)
    }
    else {
      // 兜底
      button.style.position = 'fixed'
      button.style.top = '10px'
      button.style.left = '10px'
      body.appendChild(button)
    }
  }
})()
