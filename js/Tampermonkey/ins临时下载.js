// ==UserScript==
// @name         临时INS下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const replaceJpegWithJpg = false;
  window.onload = function () {
    function getArticleNode(target) {
      while (target.tagName !== 'ARTICLE') {
        target = target.parentNode
      }
      return target
    }
    function down(urls, filename) {
      let arrs = urls.split(',')
      let url = arrs[0].split(' ')[0]
      downloadResource(url, filename)
    }

    function forceDownload(blob, filename, extension) {
      // ref: https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
      var a = document.createElement('a');
      if (replaceJpegWithJpg) extension = extension.replace('jpeg', 'jpg')
      a.download = filename + '.' + extension;
      a.href = blob;
      // For Firefox https://stackoverflow.com/a/32226068
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    // Current blob size limit is around 500MB for browsers
    function downloadResource(url, filename) {
      console.log("lhk", url, filename);
      if (url.startsWith('blob:')) {
        forceDownload(url, filename, 'mp4');
        return;
      }
      console.log(`Dowloading ${url}`);
      // ref: https://stackoverflow.com/questions/49474775/chrome-65-blocks-cross-origin-a-download-client-side-workaround-to-force-down
      fetch(url, {
        headers: new Headers({
          Origin: location.origin,
        }),
        mode: 'cors',
      })
        .then(response => response.blob())
        .then(blob => {
          const extension = blob.type.split('/').pop();
          let blobUrl = window.URL.createObjectURL(blob);
          forceDownload(blobUrl, filename, extension);
        })
        .catch(e => console.error(e));
    }

    function DateFormat() {
      const date = new Date()
      let day = date.getFullYear() + date.getMonth() + 1 + date.getDate()
      let time = date.getHours() + date.getMinutes() + date.getSeconds()
      return day + "_" + time
    }


    function download() {
      const imgs = document.querySelectorAll("._aagw")
      imgs.forEach((item) => {
        if (item.downready === '1') return;
        item.addEventListener('click', (e) => {
          e.preventDefault()
          let article = getArticleNode(e.target)
          let up = article.getElementsByTagName('header')[0].getElementsByTagName('span')[0].firstChild.innerText
          let date = DateFormat()
          let filename = up + date
          down(item.parentNode.getElementsByTagName('img')[0].srcset, filename)
        })
        item.downready = '1'
      })
    }

    setTimeout(() => {
      download()
    }, 2000)

    window.addEventListener('click', () => {
      download()
    })
  }
})();