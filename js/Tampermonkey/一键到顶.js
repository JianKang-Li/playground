// ==UserScript==
// @name         一键到顶
// @namespace    http://tampermonkey.net/
// @version      0.1.27
// @description  页面到顶
// @author       ljk

// @match      *.baidu.com/*
// @match      *.bilibili.com/*
// @match      *.zhihu.com/*
// @match      *store.steampowered.com/*
// @match      *steamcommunity.com/*
// @match      *help.steampowered.com/*
// @match      *store.epicgames.com/*
// @match      *.epicgames.com/*
// @match      *.unrealengine.com/*
// @match      *.csdn.net/*
// @match      *github.com/*
// @match      *.npmjs.com/*
// @match      *gitee.com/*
// @match      *juejin.cn/*
// @match      *.cnblogs.com/*
// @match      *.youtube.com/*
// @match      *.uniapp.dcloud.net.cn/*
// @match      *.kuaishou.com/profile/*

// @match      *biquys.com/*

// @exclude    *player.bilibili*
// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `

  .lbtn {
    background-color: rgba(250, 250, 250, 0.8);
    width:32px;
    border:none;
    height:32px;
    border-radius: 50%;
    position: fixed;
    left: 1em;
    bottom: 4em;
    z-index: 9999;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .lbtn:focus {
    outline: none;
  }
`
  const buttons = document.createElement('div')
  buttons.className = 'lbtn'
  buttons.innerText = `up`
  buttons.setAttribute('id', 'ljk')
  buttons.setAttribute("contenteditable", false)

  const body = document.querySelector("body")

  body.appendChild(style)
  body.appendChild(buttons)

  const ljk = document.querySelector("#ljk")

  ljk.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    const main = document.querySelector('main')
    main && main.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  });
})();
