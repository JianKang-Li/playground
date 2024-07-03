// ==UserScript==
// @name         新标签页打开链接
// @namespace    http://tampermonkey.net/
// @version      0.0.3
// @description  链接跳转
// @author       ljk
// @icon         https://raw.githubusercontent.com/JianKang-Li/playground/main/favicon.ico
// @match        *://*/*
// @exclude      *://127.0.0.1:*/*
// @exclude      *://localhost:*/*
// @grant        none
// @license      GPL
// ==/UserScript==

(function () {
  "use strict";
  const config = {
    openLinks: {
      'github.com': ['a.Link--primary.Link', 'a.markdown-title', 'a[rel="nofollow"]', '[data-a11y-link-underlines=true] .markdown-body a']
    }
  }

  // https://github.com/wangbin3162/bin-ui/blob/master/src/utils/log.js
  function log(title, text, type) {
    let color = ''
    switch (type) {
      case 'primary':
        color = '#1089ff'
        break
      case 'success':
        color = '#52c41a'
        break
      case 'warning':
        color = '#fea638'
        break
      case 'danger':
        color = '#ff4d4f'
        break
      case 'default':
        color = '#35495E'
        break
      default:
        color = type
        break
    }

    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent'
    )
  }

  function newTabOpen(selector) {
    const links = document.querySelectorAll(selector)

    links.forEach(link => {
      link.target = "_blank"
    })
  }

  window.addEventListener('load', function () {
    setTimeout(() => {
      for (const key in config.openLinks) {
        if (window.location.href.includes(key)) {
          config.openLinks[key].forEach(x => newTabOpen(x))
          log("成功", `新标签页打开-${key}`,'success')
        }
      }
    }, 1000)
  })
})()
