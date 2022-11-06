// ==UserScript==
// @name         dy
// @namespace    http://tampermonkey.net/
// @version      0.2.4
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
      const videos = document.querySelectorAll('video')
      const len = videos.length
      let video = len === 1 ? videos[0] : len === 3 ? videos[1] : videos[0]
      video.pause()
      let imgs;
      if (location.href.indexOf("user") !== -1) {
        imgs = document.querySelectorAll('.swiper-container .swiper-wrapper img')
      } else {
        try {
          imgs = document.querySelectorAll(".swiper-wrapper")[1].getElementsByTagName('img')
        } catch {
          alert('没有图片')
          return;
        }
      }

      let set = new Set()
      imgs = Array.from(imgs)
      imgs.forEach((item) => {
        set.add(item.src)
      })
      console.log(set);
      if (set.size === 0) {
        alert("获取图片失败")
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
        const date = new Date()
        let filename = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`
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
    })
  }
})()