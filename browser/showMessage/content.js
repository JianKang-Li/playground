const div = document.createElement('div')
div.id = 'stylepop'
div.style = 'display:none;position:fixed;top:0;right:0;width:250px;height:250px;z-index:99999;font-size:14px;background:#fff;'
div.innerHTML = `<div id='showMessage' style="padding:10px;">没有选择元素</div><button id='cancelBtn' style='border:none;background-color:#eee;padding:5px 20px;border-radius:5px;margin-top:10px;'>隐藏</button>`
document.body.appendChild(div)
const pop = document.querySelector('#stylepop')
document.body.addEventListener('click', (e) => {
  const ele = e.target
  const styles = window.getComputedStyle(ele)
  const div = document.querySelector('#showMessage')
  div.innerHTML = `
  <p style='line-height:1;margin:0;padding:0;'>目标：${e.target.nodeName}</p>
  <p style='line-height:1;margin:0;padding:0;'>类：${e.target.classList}</p>
  <p style='line-height:1;margin:0;padding:0;'>宽度：${styles.width}</p>
  <p style='line-height:1;margin:0;padding:0;'>高度：${styles.height}</p>
  <p style='line-height:1;margin:0;padding:0;display:inline;'>颜色：${styles.color}</p><div style='display:inline-block;width:10px;height:10px;background-color:${styles.color}'></div>
  <p style='line-height:1;margin:0;padding:0;'>背景：${styles.background}</p>
  <p style='line-height:1;margin:0;padding:0;'>margin：${styles.margin}</p>
  <p style='line-height:1;margin:0;padding:0;' >padding：${styles.padding}</p>
  <p style='line-height:1;margin:0;padding:0;'>字体：${styles.fontFamily}</p>
  <p style='line-height:1;margin:0;padding:0;'>字号：${styles.fontSize}</p>
  `
})

if (pop.style.display === 'none') {
  pop.style.display = 'block'
}

const cancel = document.querySelector('#cancelBtn')
cancel.onclick = (e) => {
  e.stopPropagation()
  pop.style.display = 'none'
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request==='open'){
    pop.style.display='block'
  }
});
