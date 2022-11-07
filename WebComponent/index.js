// button
class myBtn extends HTMLElement {
  constructor() {
    super()
    let template = document.createElement('template')
    // 创建模板
    template.innerHTML = `
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
        <slot name="content">text</slot>
      </button>
    `
    // 创建shadow root mode可以是open或者是closed,这定义了shadow root的内部实现是否可以被js访问及修改

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
// 第一个参数为自命名组件名，第二个参数为类对象注册自定义组件，注意命名
customElements.define('my-btn', myBtn);


