// ==UserScript==
// @name         链接识别
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  链接跳转
// @author       ljk

// @match        *://*/*
// @exclude      *://127.0.0.1:*/*
// @exclude      *://localhost:*/*
// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `
  .poptext {
    width: fit-content;
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
    max-width:15rem;
    text-overflow: ellipsis;
    white-space:normal;
    word-break:break-all;
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

  .poptext .qx{
    background-color: #eee;
    color:black
  }
`

  const body = document.querySelector("body")

  body.appendChild(style)


  // 增加选择网址弹出选项
  window.addEventListener('mouseup', () => {
    let url = window.getSelection().toString().trim()
    let s = /^http/.test(url)
    let t = /www.*/.test(url)
    if (s || t) {
      const body = document.body
      const pop = document.createElement('div')
      pop.className = 'poptext'
      pop.innerText = `发现链接地址${url}`
      const button1 = document.createElement('button')
      button1.innerText = '打开'
      const button2 = document.createElement('button')
      button2.innerText = '复制'
      const button3 = document.createElement('button')
      button3.className = 'qx'
      button3.innerText = '取消'
      const buttons = document.createElement('div')
      buttons.appendChild(button1)
      buttons.appendChild(button2)
      buttons.appendChild(button3)
      button1.addEventListener('click', () => {
        if (t) {
          url = "http://" + url
        }
        window.open(url)
        pop.remove()
      })
      button2.addEventListener('click', () => {
        let theClipboard = navigator.clipboard;
        if (theClipboard) {
          let promise = theClipboard.writeText(url)
        } else {
          // 兼容不支持clipboard
          let copyInput = document.createElement('input');//创建input元素
          document.body.appendChild(copyInput);//向页面底部追加输入框
          copyInput.setAttribute('value', url);//添加属性，将url赋值给input元素的value属性
          copyInput.select();//选择input元素
          document.execCommand("Copy");//执行复制命令
          copyInput.remove();//删除动态创建的节点
        }
        pop.remove()
      })
      button3.addEventListener('click', () => {
        pop.remove()
      })
      pop.appendChild(buttons)
      body.appendChild(pop)
      window.getSelection().removeAllRanges()
    }
  })
})();
