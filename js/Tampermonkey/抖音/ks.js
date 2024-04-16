// ==UserScript==
// @name         ks
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  快手网页视频链接下载!
// @author       jk小帅
// @match        https://www.kuaishou.com/*
// @grant        none
// @license GPL
// ==/UserScript==

/*
已测试页面
+ 推荐
+ up主页
+ 个人喜欢页面
*/
// 快手视频下载
(function () {
  'use strict'

  const button1 = document.createElement('button')
  button1.setAttribute('id', 'ks0')
  button1.setAttribute('style', 'cursor: pointer;padding:3px 5px;background-color:#161722;color:#ffff;outline:none;position: fixed;left:35px;bottom:3rem;z-index:99999')
  button1.textContent = '视频下载'

  const button2 = document.createElement('button')
  button2.setAttribute('id', 'ks1')
  button2.setAttribute('style', 'display:none;cursor: pointer;padding:3px 5px;background-color:#161722;color:#ffff;outline:none;position: fixed;left:35px;bottom:2rem;z-index:99999')
  button2.textContent = '图片下载\n(需开启弹出式权限)'

  window.onload = () => {
    const body = document.querySelector('body')
    body.appendChild(button1)
    body.appendChild(button2)

    const ks0 = document.querySelector('#ks0')
    const ks1 = document.querySelector('#ks1')

    ks0.addEventListener('click', () => {
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video
      switch (len) {
        case 1: {
          video = videos[0]
          break
        }
        case 2: {
          video = videos[0]
          break
        }
        case 3: {
          video = videos[1]
          break
        }
        case 4: {
          video = videos[3]
          break
        }
      }
      const src = video.src
      if (!src) {
        alert('获取url地址失败')
      }
      else {
        video.pause()
        const date = new Date()
        const filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
        fetch(src)
          .then(res => res.blob())
          .then((blob) => {
            const a = document.createElement('a')
            const objectUrl = window.URL.createObjectURL(blob)
            a.download = filename
            a.href = objectUrl
            a.click()
            window.URL.revokeObjectURL(objectUrl)
            a.remove()
          })
      }
    })

    ks1.addEventListener('click', () => {
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video
      let index = 1
      switch (len) {
        case 1: {
          video = videos[0]
          index = 0
          break
        }
        case 2: {
          video = videos[0]
          index = 0
          break
        }
        case 3: {
          video = videos[1]
          index = 1
          break
        }
        case 4: {
          video = videos[3]
          index = 3
          break
        }
      }
      video.pause()
      let imgs
      if (location.href.includes('user')) {
        imgs = document.querySelectorAll('.swiper-container .swiper-wrapper img')
      }
      else {
        try {
          imgs = document.querySelectorAll('.swiper-container.focusPanel .swiper-wrapper')
          switch (imgs.length) {
            case 1: {
              imgs = imgs[0].getElementsByTagName('img')
              break
            }
            case 2: {
              imgs = imgs[1].getElementsByTagName('img')
              break
            }
            default:
              imgs = document.querySelector('video').parentElement.parentElement.getElementsByTagName('img')
              break
          }
        }
        catch {
          alert('没有图片')
          return
        }
      }
      const set = new Set()
      imgs = Array.from(imgs)
      imgs.forEach((item) => {
        set.add(item.src)
      })
      // console.log(set);
      if (set.size === 0) {
        alert('获取图片失败')
      }
      else {
        set.forEach((img) => {
          window.open(img)
        })
      }
    })
  }
})()
