// ==UserScript==
// @name         抖音优化
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  try to take over the world!
// @author       You
// @match        https://www.douyin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  const hiddes = ['.OFZHdvpl', '.account', '.MN8dFKun.Xg7imLcG.wNX5IKkc', '#video-info-wrap > div.video-info-detail > div.under-title-tag > div > div', '#dy0', '#dy1', '#speedControl', '.lPytbapz.XClSex3D.NBmn3s18.mnN5bEWt', '.xgplayer-playswitch.JHxtTxhQ']
  const hiddels = ['#video-info-wrap > div.video-info-detail > div.title > div > div > span > span > span > a']
  function cleanPlus() {
    const btn1 = document.querySelector('#cleanB')
    if (btn1 && btn1.classList.value.split(' ').includes('xg-switch-checked')) {
      hiddes.forEach((hidde) => {
        const item = document.querySelector(hidde)
        item && (item.style.visibility = 'hidden')
      })
      hiddels.forEach((hidde) => {
        const items = document.querySelectorAll(hidde)
        items && (Array.from(items).forEach((item) => {
          item.style.visibility = 'hidden'
        }))
      })
    }
    else {
      hiddes.forEach((hidde) => {
        const item = document.querySelector(hidde)
        item && (item.style.visibility = 'visible')
      })
      hiddels.forEach((hidde) => {
        const items = document.querySelectorAll(hidde)
        items && (Array.from(items).forEach((item) => {
          item.style.visibility = 'visible'
        }))
      })
    }
  }

  function getVideo() {
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
    return video
  }

  function up() {
    const upB = document.querySelector('div[data-e2e=video-switch-prev-arrow]')
    const video = getVideo()
    const btn = document.querySelector('#upB')

    if (!btn)
      add()

    video && video.addEventListener('ended', () => {
      // console.log(typeof btn.classList);
      if (btn && btn.classList.value.split(' ').includes('xg-switch-checked'))
        upB.click()
    })
  }

  function add() {
    const container = document.querySelector('xg-right-grid')
    const sbtn = document.createElement('xg-icon')
    sbtn.innerHTML = `<div class="xgplayer-icon">
    <div class="xgplayer-up-label" style="align-items: center;display: flex;justify-content: center;"><button id='upB' aria-checked="true" class="xg-switch" aria-labelledby="xg-switch-pip"
        type="button"><span class="xg-switch-inner"></span></button><span class="xgplayer-up-title">上滑</span>
    </div>
  </div>
  <div class="xgTips"><span>自动上滑</span></div>`
    sbtn.id = 'up'
    sbtn.setAttribute('class', 'xgplayer-immersive-switch-setting immersive-switch')
    container && container.appendChild(sbtn)
    sbtn.addEventListener('click', () => {
      const btn = document.querySelector('#upB')
      btn.classList.toggle('xg-switch-checked')
      up()
    })
    const sbtn1 = document.createElement('xg-icon')
    sbtn1.innerHTML = `<div class="xgplayer-icon">
    <div class="xgplayer-clean-label" style="align-items: center;display: flex;justify-content: center;"><button id='cleanB' aria-checked="true" class="xg-switch" aria-labelledby="xg-switch-pip"
        type="button"><span class="xg-switch-inner"></span></button><span class="xgplayer-clean-title">超清</span>
    </div>
  </div>
  <div class="xgTips"><span>超清</span></div>`
    sbtn1.id = 'clean'
    sbtn1.setAttribute('class', 'xgplayer-immersive-switch-setting immersive-switch')
    container && container.appendChild(sbtn1)
    sbtn1.addEventListener('click', () => {
      const btn = document.querySelector('#cleanB')
      btn.classList.toggle('xg-switch-checked')
      cleanPlus()
    })
  }
  function done() {
    const con = document.querySelector('xg-video-container')
    const btn = document.querySelector('#upB')
    if (con && !btn)
      add()
  }
  window.onload = function () {
    // 自动上滑
    if (window.location.href.includes('user')) {
      const observer = new MutationObserver(done)
      const targetNode = document.querySelector('body')
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true }
      observer.observe(targetNode, config)
    }

    // 下载功能
    const button1 = document.createElement('button')
    button1.setAttribute('id', 'dy0')
    button1.setAttribute('style', 'cursor: pointer;padding:0.3rem 0.5rem;background-color:#161722;color:#ffff;outline:none;position: fixed;left:2rem;bottom:13.5rem;z-index:99999')
    button1.textContent = '视频下载'

    const button2 = document.createElement('button')
    button2.setAttribute('id', 'dy1')
    button2.setAttribute('style', 'cursor: pointer;padding:0.3rem 0.5rem;background-color:#161722;color:#ffff;outline:none;position: fixed;left:2rem;bottom:10rem;z-index:99999')
    button2.textContent = '图片下载\n(需开启弹出式权限)'
    const body = document.querySelector('body')
    body.appendChild(button1)
    body.appendChild(button2)

    const dy0 = document.querySelector('#dy0')
    const dy1 = document.querySelector('#dy1')

    dy0.addEventListener('click', () => {
      const videos = document.querySelectorAll('video:not(.UFQuOSb4)')
      console.warn(videos)
      const len = videos.length
      let video
      let index = 0
      switch (len) {
        case 1: {
          index = 0
          video = videos[0]
          break
        }
        case 2: {
          index = 0
          video = videos[0]
          break
        }
        case 3: {
          index = 1
          video = videos[1]
          break
        }
        case 4: {
          index = 3
          video = videos[3]
          break
        }
      }
      const src = video?.firstChild?.src || video?.src || null
      if (!src) {
        alert('获取url地址失败')
      }
      else if (src.startsWith('blob')) {
        alert('当前视频地址为blob地址')
      }
      else {
        video.pause()
        const date = new Date()
        console.log(video, index)
        let author = document.querySelectorAll('div.account-name > span > span > span > span > span > span > span')[index]?.textContent || document.querySelectorAll(' div.account-name > span > span > span > span > span > span > span')[index]?.textContent
          || document.querySelector('#relatedVideoCard > div > div.uKuFKJ0b.IXOrpi3W > div > div > div.FJDQuKlF.MHDJgSQA.sktxdhWs > div.AVi4_ejO > div > a > div.h2xNBxgs.author-card-user-name > span:nth-child(2) > span > span > span > span > span')?.textContent || ''
        author = author.slice(1, author.length)
        const filename = `${author}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}.mp4`
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

    dy1.addEventListener('click', () => {
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
        imgs = document.querySelectorAll('.dySwiperSlide img')
      }
      else {
        try {
          imgs = document.querySelectorAll('.playerContainer .focusPanel')
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
              imgs = video.parentElement.parentElement.getElementsByTagName('img')
              break
          }
        }
        catch {
          alert('没有图片')
          return
        }
      }
      console.warn(imgs)
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
