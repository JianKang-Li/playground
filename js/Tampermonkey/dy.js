// ==UserScript==
// @name         dy
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  抖音网页视频链接下载!
// @author       jk小帅
// @match        https://www.douyin.com/*
// @grant        none
// @license GPL
// ==/UserScript==

// 抖音视频下载
(function () {
  "use strict";

  const buttons = `
  <div class="fuy_wmct qoKzjoSV">
  <span id='dy1' class="xPz2YtoZ">视频下载</span>
  </div>
`


  window.onload = () => {
    const bts = document.querySelector("#root > div > div.N_HNXA04.WcK6IrkT > div.kQ2JnIMK.S9ST96Zy > div.a9jyVZQj.S9ST96Zy > div > div")
    bts.innerHTML += buttons

    const dy1 = document.querySelector("#dy1")
    // const dy = document.querySelector("#dy")

    dy1.addEventListener("click", function () {
      var video = document.querySelector("#sliderVideo > div.JrMwkvQy.playerContainer.YFEqUSvt.dLCldFlr > div.zK9etl_2.slider-video > div > xg-video-container > video > source:nth-child(1)")
      var video_like = document.querySelector("#slidelist > div.swiper-container.swiper-container-initialized.swiper-container-vertical.swiper-container-autoheight.qRePWKBJ.fullscreen_capture_feedback > div.swiper-wrapper > div.swiper-slide.MeiAPn_s.swiper-slide-active > div > div.KXURcZ2l.playerContainer.P8fJYYpG > div > div > xg-video-container > video > source:nth-child(1)")
      console.log(video)
      if (!video && !video_like) {
        alert("获取失败!")
      }
      else if (video) {
        let url1 = video.src;
        setTimeout(() => {
          window.open(url1);
        }, 1000);
      }
      else if (video_like) {
        let url1 = video_like.src;
        setTimeout(() => {
          window.open(url1);
        }, 1000);
      }
    });
  }

})()

