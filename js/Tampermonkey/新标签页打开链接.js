// ==UserScript==
// @name         新标签页打开链接
// @namespace    http://tampermonkey.net/
// @version      0.0.8
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
  window.addEventListener('load', function () {
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      if (link.href.startsWith('http')) {
        link.target = "_blank"
      }
    })
    console.log('设置完成')
  })
})();
