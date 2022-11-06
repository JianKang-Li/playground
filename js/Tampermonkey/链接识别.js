// ==UserScript==
// @name         一键到顶
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  页面到顶
// @author       ljk

// @match      *
// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `
  .poptext {
    width: max-content;
    padding: 0.3rem 1rem;
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 2px 2px 10px #eee,
      3px 3px 15px #eee;
      z-index:9999;
    border-radius: 0.3rem;
  }

  .poptext button {
    background-color: rgb(0, 102, 153);
    width: fit-content;
    border: 0;
    padding: 0.3rem 1rem;
    border-radius: 0.3rem;
    color: #fff;
  }

  .poptext>div{
    display:flex,
    align-items: center;
  }
  .poptext>div button{
    margin:0.3rem
  }
`

  const body = document.querySelector("body")

  body.appendChild(style)


  // 增加选择网址弹出选项
  window.addEventListener('mouseup', () => {
    let p = window.getSelection().toString().trim()
    if (/^http/.test(p)) {
      const body = document.body
      const pop = document.createElement('div')
      pop.className = 'poptext'
      pop.innerText = "发现链接地址"
      const button1 = document.createElement('button')
      button1.innerText = '打开'
      const button2 = document.createElement('button')
      button2.innerText = '取消'
      const buttons = document.createElement('div')
      buttons.appendChild(button1)
      buttons.appendChild(button2)
      button1.addEventListener('click', () => {
        window.open(p)
        pop.remove()
      })
      button2.addEventListener('click', () => {
        pop.remove()
      })
      pop.appendChild(buttons)
      body.appendChild(pop)
      window.getSelection().removeAllRanges()
    }
  })
})();
