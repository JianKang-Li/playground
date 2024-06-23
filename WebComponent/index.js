/*
常用的生命周期方法如下:

connectedCallback

当 web component 被添加到 DOM 时，会调用这个回调函数，这个函数只会被执行一次。可以在这个回调函数中完成一些初始化操作，比如更加参数设置组件的样式。

disconnectedCallback

当 web component 从文档 DOM 中删除时执行。

adoptedCallback

当 web component 被移动到新文档时执行。

attributeChangedCallback

被监听的属性发生变化时执行。
*/

/* 工厂函数用于创建自定义组件，参数name:自定义组件名；html:自定义模板 */
/* 仅适用于不含js操作的简单组件 */
function createComponent(name, html, script = null) {
  class myComponent extends HTMLElement {
    constructor() {
      super()
      const template = document.createElement('template')
      // 创建模板
      template.innerHTML = html
      if (script)
        script()

      // 创建shadow root mode可以是open或者是closed,这定义了shadow root的内部实现是否可以被js访问及修改
      this._shadowRoot = this.attachShadow({ mode: 'closed' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
    }
  }
  // 第一个参数为自命名组件名，第二个参数为类对象注册自定义组件，注意命名
  customElements.define(name, myComponent)
}

// button
const button = `
<style>
button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: rgb(0, 153, 255);
  color: rgb(255, 255, 255);
  border: 0;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all .5 linear;
}

button:active {
  transform: scale(0.9);
  background-color: rgba(0, 153, 255, 0.8);
}
</style>
<button>
  <slot name="bicon"></slot>
  <slot name="content">text</slot>
  <slot name="aicon"></slot>
</button>
`
createComponent('lk-btn', button)

// input text
const input = `
<style>
input {
  border: 1px solid rgb(232, 234, 237);
  line-height: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: rgb(70, 174, 247);
}
</style>
<input type="text" placeholder="请输入...">
`

createComponent('lk-input', input)

// link icon
const link = `
<style>
div {
  text-decoration: none;
  padding: 0.1rem 0;
  width:fit-content;
  color:rgb(70, 174, 247);
  cursor: pointer;
}


div:hover {
  color: rgba(70, 174, 247, 0.8);
  border-bottom: 1px solid rgba(70, 174, 247, 0.8);
}
</style>

<div>
  <slot name="bicon"></slot>
  <slot name="link">主要链接</slot>
  <slot name="aicon"></slot>
</div>
`
createComponent('lk-link', link)

// 开关
const toggle = `
<style>
.LK-toggle {
  vertical-align: middle;
  appearance: none;
  height: 1rem;
  width: 2rem;
  cursor: pointer;
  background-color:#E8EAED ;
  border-radius: 1rem;
  position: relative;
  padding-left: 1px;
  outline: none;
}

.LK-toggle:checked {
  background-color: #0099ff;
  outline: none;
}

.LK-toggle::after {
  content: "";
  display: block;
  position: absolute;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  top: 50%;
  left:2px;
  transform: translateY(-50%);
  background-color: #fff;
  transition: 0.5s;
}

.LK-toggle:checked::after {
  outline: none;
  transform-origin: center;
  transform: translate(calc(1rem - 1px), -50%);
}

p{
  display:inline;
}
</style>

<input type='checkbox' class='LK-toggle'/>
<slot name='label'>标签</slot>
`
createComponent('lk-toggle', toggle)
