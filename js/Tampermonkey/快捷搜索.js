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
  "use strict";

  const style = document.createElement("style")
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
  const buttons = document.createElement("div")
  buttons.className = "sbtns"
  buttons.setAttribute("contentwbable", false)

  const body = document.querySelector("body")
  let flag = 0
  let keyword = ''
  let btns = ['百度', 'github', '微博', '掘金', 'CSDN', 'stackoverflow']
  let searchUrl = ['https://www.baidu.com/s?wd=', 'https://github.com/search?q=',
    'https://s.weibo.com/weibo?q=', 'https://juejin.cn/search?query=',
    'https://so.csdn.net/so/search?q=', 'https://stackoverflow.com/search?q=']


  btns.forEach((btn, index) => {
    const button = document.createElement('button')
    button.className = 'sbtn'
    button.innerText = btn
    buttons.appendChild(button)
    button.addEventListener('click', () => {
      window.open(searchUrl[index] + keyword)

    })
  })

  function pop(e) {
    keyword = window.getSelection().toString()
    const buttons = document.querySelector('.sbtns')
    if (keyword.trim() != '') {
      if (flag === 0) {
        let left = e.pageX
        let top = e.pageY
        buttons.style.left = left + 'px'
        buttons.style.top = top + 'px'
        buttons.style.display = 'flex'
        flag = 1
      }
    } else {
      buttons.style.display = 'none'
      flag = 0
    }
  }

  body.appendChild(style)
  body.appendChild(buttons)
  window.addEventListener('mouseup', pop)
})();
