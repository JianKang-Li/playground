// ==UserScript==
// @name         快捷搜索
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  快捷划词搜索
// @author       ljk

// @match             *://*/*

// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  'use strict'

  const style = document.createElement('style')
  style.innerHTML = `
  .sbtns {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 9999;
    background:#70a1ff;
    border-radius: 16px;
    width: max-content;
    height:max-content;
    padding:4.8px;
    display:none;
  }

  .sbtn {
    padding: 4.8px 8px;
    border: 0;
    cursor: pointer;
    margin-left:0;
    color:#fff;
    background:#70a1ff;
    width:100%;
  }

  .sbtn:focus {
    outline: none;
  }
`
  const buttons = document.createElement('div')
  buttons.className = 'sbtns'
  buttons.setAttribute('contentwbable', false)

  const body = document.querySelector('body')
  let keyword = ''
  const btns = ['复制', '百度', 'github', '抖音', '微博', '掘金', 'CSDN', 'stackoverflow']
  const searchUrl = ['https://www.baidu.com/s?wd=', 'https://github.com/search?q=', 'https://www.douyin.com/search/', 'https://s.weibo.com/weibo?q=', 'https://juejin.cn/search?query=', 'https://so.csdn.net/so/search?q=', 'https://stackoverflow.com/search?q=']

  btns.forEach((btn, index) => {
    const button = document.createElement('button')
    button.className = 'sbtn'
    button.textContent = btn
    buttons.appendChild(button)
    button.addEventListener('click', () => {
      if (index === 0) {
        const theClipboard = navigator.clipboard
        if (theClipboard) {
          theClipboard.writeText(keyword)
        }
        else {
          // 兼容不支持clipboard
          const copyInput = document.createElement('input')// 创建input元素
          document.body.appendChild(copyInput)// 向页面底部追加输入框
          copyInput.setAttribute('value', keyword)// 添加属性，将url赋值给input元素的value属性
          copyInput.select()// 选择input元素
          document.execCommand('Copy')// 执行复制命令
          copyInput.remove()// 删除动态创建的节点
        }
        buttons.style.display = 'none'
      }
      else {
        window.open(searchUrl[index - 1] + keyword)
      }
    })
  })

  function pop(e) {
    keyword = window.getSelection().toString()
    const buttons = document.querySelector('.sbtns')

    console.log("user-select", keyword)
    if (keyword.trim() !== '') {
      if (buttons.style.display === 'none') {
        buttons.style.display = 'flex'
        const width = buttons.clientWidth
        const height = buttons.clientHeight
        const targetPosition = { left: e.pageX, top: e.pageY}

        if (
          height + targetPosition.top >=
          window.innerHeight + window.scrollY
        ) {
          const targetTop = targetPosition.top - height;

          if (targetTop > window.scrollY) {
            targetPosition.top = targetTop;
          }
        }

        if (
          width + targetPosition.left >=
          window.innerWidth + window.scrollX
        ) {
          const targetWidth = targetPosition.left - width;

          if (targetWidth > window.scrollX) {
            targetPosition.left = targetWidth;
          }
        }
        buttons.style.left = `${targetPosition.left}px`
        buttons.style.top = `${targetPosition.top}px`
      }
    } else {
      buttons.style.display = 'none'
    }
  }

  body.appendChild(style)
  body.appendChild(buttons)
  window.addEventListener('mouseup', pop)
})()
