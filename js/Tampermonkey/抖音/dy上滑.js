// ==UserScript==
// @name         自动上滑
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douyin.com/user/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        none
// ==/UserScript==

/*
data-state="normal" data-index="8"
*/
(function () {
  'use strict';
  function up() {
    const upB = document.querySelector('div[data-e2e=video-switch-prev-arrow]')
    const videos = document.querySelectorAll('video')
    const len = videos.length
    let video;
    switch (len) {
      case 1: {
        video = videos[0];
        break;
      }
      case 2: {
        video = videos[0];
        break;
      }
      case 3: {
        video = videos[1];
        break;
      }
      case 4: {
        video = videos[3]
        break;
      }
    }
    const btn = document.querySelector('#upB')
    if (!btn) {
      add()
    }
    video && video.addEventListener('ended', () => {
      // console.log(typeof btn.classList);
      if (btn && btn.classList.value.split(' ').includes('xg-switch-checked')) {
        upB.click()
      }
    })
  }

  function add() {
    const container = document.querySelector('xg-right-grid')
    const sbtn = document.createElement('xg-icon')
    sbtn.innerHTML = `<div class="xgplayer-icon">
    <div class="xgplayer-setting-label"><button id='upB' aria-checked="true" class="xg-switch" aria-labelledby="xg-switch-pip"
        type="button"><span class="xg-switch-inner"></span></button><span class="xgplayer-setting-title">上滑</span>
    </div>
  </div>
  <div class="xgTips"><span>自动上滑</span></div>`
    sbtn.id = 'up'
    sbtn.setAttribute('class', 'xgplayer-immersive-switch-setting immersive-switch')
    container && container.appendChild(sbtn)
    sbtn.addEventListener('click', function () {
      const btn = document.querySelector('#upB')
      btn.classList.toggle('xg-switch-checked')
      up()
    })
  }
  function done() {
    const con = document.querySelector('xg-video-container')
    const btn = document.querySelector('#upB')
    if (con && !btn) {
      add()
    }
    else {
      return
    }
  }
  window.onload = function () {
    let observer = new MutationObserver(done);
    const targetNode = document.querySelector('body');
    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);
  }

})();