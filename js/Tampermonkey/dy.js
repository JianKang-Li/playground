// ==UserScript==
// @name         dy
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  抖音网页视频链接下载!
// @author       jk小帅
// @match        https://www.douyin.com/*
// @grant        none
// @license GPL
// ==/UserScript==

// 抖音视频下载
(function () {
  "use strict";

  const button1 = document.createElement('button')
  button1.setAttribute('id', 'dy0')
  button1.setAttribute('style', 'padding:0.3rem 0.5rem;background-color:#161722;color:#ffff;outline:none;position: fixed;left:2rem;bottom:9.5rem;z-index:99999')
  button1.innerText = '视频下载'

  const button2 = document.createElement('button')
  button2.setAttribute('id', 'dy1')
  button2.setAttribute('style', 'padding:0.3rem 0.5rem;background-color:#161722;color:#ffff;outline:none;position: fixed;left:2rem;bottom:6rem;z-index:99999')
  button2.innerText = '图片下载\n(需开启弹出式权限)'

  window.onload = () => {

    const body = document.querySelector('body')
    body.appendChild(button1)
    body.appendChild(button2)

    const dy0 = document.querySelector("#dy0")
    const dy1 = document.querySelector('#dy1')

    dy1.addEventListener('click', function () {
      let imgs = document.querySelectorAll('.swiper-slide img')
      let set = new Set()
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video = len === 1 ? videos[0] : len === 3 ? videos[1] : videos[0]
      video.pause()
      imgs.forEach((item) => {
        set.add(item.src)
      })
      if (set.size === 0) {
        alert("获取失败")
        return;
      } else {
        set.forEach((img) => {
          window.open(img)
        })
      }
    })

    dy0.addEventListener('click', function () {
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video = len === 1 ? videos[0] : len === 3 ? videos[1] : videos[0]
      let src = video.firstChild.src;
      if (!src) {
        alert('获取url地址失败')
      } else {
        video.pause();
        setTimeout(() => {
          window.open(src);
        }, 300);
      }
    })
  }
})()