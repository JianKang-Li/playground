(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `
  .sbtns {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 9999;
    background:#70a1ff;
    border-radius: 16px;
    width: max-content;
    height:max-content;
    padding:4.8px;
    display:none;
  }

  .sbtn {
    padding: 4.8px 8px;
    border: 0;
    cursor: pointer;
    margin-left:0;
    color:#fff;
    background:#70a1ff;
    width:100%;
  }

  .sbtn:focus {
    outline: none;
  }
`
  const buttons = document.createElement("div")
  buttons.className = "sbtns"
  buttons.setAttribute("contentwbable", false)

  const body = document.querySelector("body")
  let flag = 0
  let up = ''
  let keyword = ''
  let btns = ['打开', '复制', '百度', '百度开发', 'github', '抖音', '微博', '掘金', 'CSDN', 'stackoverflow']
  let searchUrl = ['https://www.baidu.com/s?wd=', 'https://kaifa.baidu.com/searchPage?wd=', 'https://github.com/search?q=',
    'https://www.douyin.com/search/', 'https://s.weibo.com/weibo?q=',
    'https://juejin.cn/search?query=', 'https://so.csdn.net/so/search?q=',
    'https://stackoverflow.com/search?q=']


  btns.forEach((btn, index) => {
    const button = document.createElement('button')
    button.className = 'sbtn'
    button.innerText = btn
    buttons.appendChild(button)
    button.addEventListener('click', () => {
      if (index === 1) {
        let theClipboard = navigator.clipboard;
        if (theClipboard) {
          let promise = theClipboard.writeText(up)
        } else {
          // 兼容不支持clipboard
          let copyInput = document.createElement('input');//创建input元素
          document.body.appendChild(copyInput);//向页面底部追加输入框
          copyInput.setAttribute('value', up);//添加属性，将url赋值给input元素的value属性
          copyInput.select();//选择input元素
          document.execCommand("Copy");//执行复制命令
          copyInput.remove();//删除动态创建的节点
        }
        buttons.style.display = 'none'
        flag = 0
      } else if (index === 0) {
        if (/http(s)?/.test(up)) {
          window.open(up)
        } else {
          window.open('//' + up)
        }
      }
      else {
        window.open(searchUrl[index - 2] + up)
      }
    })
  })


  function pop(e) {
    keyword = window.getSelection().toString()
    const buttons = document.querySelector('.sbtns')
    if (keyword.trim()) {
      up = keyword
    }
    if (keyword.trim() != '') {
      if (flag === 0) {
        let left = e.pageX
        let top = e.pageY
        buttons.style.left = left + 'px'
        buttons.style.top = top + 'px'
        buttons.style.display = 'flex'
        flag = 1
      }
    } else {
      buttons.style.display = 'none'
      flag = 0
    }
  }

  body.appendChild(style)
  body.appendChild(buttons)
  window.addEventListener('mouseup', pop)
})();
