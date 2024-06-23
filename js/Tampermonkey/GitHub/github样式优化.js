// ==UserScript==
// @name         GitHub 样式优化
// @namespace    http://tampermonkey.net/
// @version      2024-01-30
// @description  优化github
// @author       ljk
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict'
  const header = document.querySelector('header.AppHeader')
  const height = header.getBoundingClientRect().height
  const style = `
    header.AppHeader {
      position: fixed;
      width: 100%;
      z-index: 100;
    }

    div.application-main {
      margin-top: ${height}px;
    }

    .dashboard-sidebar {
      top: ${height}px;
    }
  `

  GM_addStyle(style)
})()
