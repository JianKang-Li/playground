const div=document.createElement('div')
div.id='stylepop'
div.style='display:none;position:fixed;top:0;right:0;width:250px;height:200px;z-index:999;'
document.body.appendChild(div)
let flag=false
document.body.addEventListener('click',(e)=>{
  const ele=e.target
  const styles=window.getComputedStyle(ele)
  let text=`
  目标：${e.target.nodeName}
  类：${e.target.classList}
  宽度：${styles.width}
  高度：${styles.height}
  颜色：${styles.color}
  背景：${styles.background}
  margin：${styles.margin}
  padding：${styles.padding}
  字体：${styles.fontFamily}
  字号：${styles.fontSize}
  `
  const pop=document.querySelector('#stylepop')
  pop.innerText=text
  if(!flag){
    pop.style.display='block'
    removeEventListener('click',pop)
    flag=true
  }
})
