// ==UserScript==
// @name         一键到顶
// @namespace    http://tampermonkey.net/
// @version      0.1.1
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

// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `
  .lbtns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 1em;
    bottom: 3em;
    z-index: 999;
  }

  .lbtn {
    padding: 0.3em 0.5em;
    background: transparent;
    border: 0;
    color: #00abe3;
    cursor: pointer;
  }

  .lbtn:focus {
    outline: none;
  }
`
  const buttons = document.createElement("div")
  buttons.classList.add("lbtns")
  buttons.innerHTML = `
    <button id='ljk' class="lbtn">一键到顶</button>
    <button id='bz' class="lbtn">B站视频</button>
    <button id='editable' class="lbtn">网页编辑</button>
    `
  buttons.setAttribute("contenteditable", false)
  // console.log(buttons)

  const body = document.querySelector("body")

  body.appendChild(style)
  body.appendChild(buttons)

  // $("body").append(buttons)
  // $("body").append(style)
  const ljk = document.querySelector("#ljk")
  const bz = document.querySelector("#bz")
  const edit = document.querySelector("#editable")

  ljk.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  });

  bz.addEventListener("click", function () {
    var url1 = window.location.pathname;
    var url = "https://www.bilibili.com/" + url1;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      window.open("https://xbeibeix.com/api/bilibili/");
    }, 1000);
  });

  edit.addEventListener("click", () => {
    "true" === document.body.getAttribute("contenteditable") ? (document.body.setAttribute("contenteditable", !1), alert("网页不能编辑啦！")) : (document.body.setAttribute("contenteditable", !0), alert("网页可以编辑啦！"))
  })
})();
