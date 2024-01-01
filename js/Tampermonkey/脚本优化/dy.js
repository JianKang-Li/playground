// ==UserScript==
// @name         抖音脚本
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       ljk
// @match        https://www.douyin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// ==/UserScript==

class DIY {
  constructor() {
    this.body = document.body
    this.initNotice()
  }

  createDom(type, attributes, html) {
    const dom = document.createElement(type)
    Object.keys(attributes).forEach(key => {
      if (key !== 'style') {
        dom.setAttribute(key, attributes[key])
      } else {
        let styleText = ''
        const style = attributes['style']
        Object.keys(style).forEach(key => {
          styleText += `${key}: ${style[key]};`
        })
        dom.setAttribute('style', styleText)
      }
    })
    dom.innerHTML = html

    return dom
  }

  insertDom(dom, parent) {
    parent.appendChild(dom)
  }

  changeDomVisible(selectorList, type) {
    for (let selector of selectorList) {
      const dom = document.querySelector(selector)

      dom && (dom.style.visibility = type)
    }
  }

  download(src, filename) {
    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        a.download = filename;
        a.href = objectUrl;
        a.click();
        window.URL.revokeObjectURL(objectUrl);
        a.remove();
      })
  }

  forceDownload(blob, filename) {
    // ref: https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  initNotice() {
    this.container = this.createDom('div', {
      id: 'lk-custom-notice',
      style: {
        position: 'fixed',
        'z-index': 9999,
        top: '2rem',
        right: '1rem',
        color: '#000',
        background: '#fff',
        padding: '0.5rem',
        'border-radius': '8px',
        'box-shadow': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        "font-size": '14px'
      }
    }, '<span>脚本加载完成</span>')

    this.body.appendChild(this.container)

    this.clearNotice()
  }

  clearNotice() {
    const $this = this
    setTimeout(function () {
      $this.container.innerHTML = ''
      $this.container.style.visibility = 'hidden'
    }, 3000)
  }

  notice(message) {
    this.container.innerHTML = `<span>${message}</span>`
    this.container.style.visibility = 'visible'
    this.clearNotice()
  }

  openTab(links) {
    links.forEach(link => {
      window.open(link)
    })
  }
}

(function () {
  'use strict';

  window.onload = function () {
    const hiddes = ['.OFZHdvpl', '.account', '.MN8dFKun.Xg7imLcG.wNX5IKkc', "#video-info-wrap > div.video-info-detail > div.under-title-tag > div > div", "#dy0", '#dy1', "#speedControl", ".lPytbapz.XClSex3D.NBmn3s18.mnN5bEWt", ".xgplayer-playswitch.JHxtTxhQ"]
    const UserImgSelectors = ['#sliderVideo > div.UsWJJZhB.playerContainer.hide-animation-if-not-suport-gpu.jjWFxVjy.dOluRUuw > div.O8onIiBq.slider-video > div > div.aCa1L065.rLhjZIAa.focusPanel > div img']
    const VideoSelector = 'video:not(.UFQuOSb4)'
    const normalImgSelector = '.playerContainer .focusPanel'
    const authorSelector = ['div.account-name > span > span > span > span > span > span > span',
      'div.account-name > span > span > span > span > span > span > span',
      '#relatedVideoCard > div > div.uKuFKJ0b.IXOrpi3W > div > div > div.FJDQuKlF.MHDJgSQA.sktxdhWs > div.AVi4_ejO > div > a > div.h2xNBxgs.author-card-user-name > span:nth-child(2) > span > span > span > span > span']
    const createTime = '#video-info-wrap > div.video-info-detail > div.account > div.video-create-time'
    const historySelector = '#douyin-header header  ul.pMBwmxGS > ul:nth-child(4)>a'
    const dy = new DIY()

    const videoButton = dy.createDom('button', {
      id: 'videoDown',
      style: {
        cursor: 'pointer',
        padding: '0.3rem 0.5rem',
        'background-color': '#161722',
        color: '#ffff',
        outline: 'none',
        position: 'fixed',
        left: '2rem',
        bottom: '7rem',
        'z-index': '99999',
      }
    }, '视频下载')

    videoButton.addEventListener('click', function () {
      const videos = document.querySelectorAll(VideoSelector)
      const len = videos.length
      let video;
      let index = 0
      const rules = {
        1: 0,
        2: 0,
        3: 1,
        4: 3
      }
      video = videos[rules[len]]
      index = rules[len]
      let src = video?.firstChild?.src || video?.src || null;
      const date = new Date()
      let author = document.querySelectorAll(authorSelector[0])[index]?.innerText || document.querySelectorAll(authorSelector[1])[index]?.innerText
        || document.querySelector(authorSelector[2])?.innerText || ''
      author = author.slice(1, author.length)
      const time = document.querySelector(createTime)?.innerText.slice(2) || `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
      const filename = `${author}-${time}.mp4`
      if (!src) {
        dy.notice('获取url地址失败')
      }
      else if (/^blob/.test(src)) {
        dy.notice('当前视频地址为blob地址')
        dy.forceDownload(src, filename)
      }
      else {
        video.pause();
        dy.download(src, filename)
      }
    })

    const imgButton = dy.createDom('button', {
      id: 'imgButton',
      style: {
        cursor: 'pointer',
        padding: '0.3rem 0.5rem',
        'background-color': '#161722',
        color: '#ffff',
        outline: 'none',
        position: 'fixed',
        left: '2rem',
        bottom: '5rem',
        'z-index': '99999',
      }
    }, '图片下载')

    imgButton.addEventListener('click', function () {
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video;
      let index = 1
      const rules = {
        1: 0,
        2: 0,
        3: 1,
        4: 3
      }
      video = videos[rules[len]]
      index = rules[len]
      video.pause()
      let imgs;
      if (location.href.indexOf("user") !== -1) {
        const container = UserImgSelectors.find(container => document.querySelector(container))
        imgs = document.querySelectorAll(container)
      } else {
        try {
          imgs = document.querySelectorAll(normalImgSelector)
          switch (imgs.length) {
            case 1: {
              imgs = imgs[0].getElementsByTagName('img')
              break;
            }
            case 2: {
              imgs = imgs[1].getElementsByTagName('img')
              break;
            }
            default:
              imgs = video.parentElement.parentElement.getElementsByTagName('img')
              break;
          }
        } catch {
          dy.notice('没有图片')
          return;
        }
      }
      console.log(imgs)
      let set = new Set()
      imgs = Array.from(imgs)
      imgs.forEach((item) => {
        set.add(item.src)
      })
      // console.log(set);
      if (set.size === 0) {
        dy.notice("获取图片失败")
        return;
      } else {
        set.forEach((img) => {
          window.open(img)
        })
      }
    })

    dy.body.appendChild(videoButton)
    dy.body.appendChild(imgButton)

    // 替换历史记录查看
    const history = document.querySelector(historySelector)
    let temp = history.href
    history.href = `${temp}?showTab=record`
    history.target = '_blank'

    console.log('脚本运行成功')
  }
})();