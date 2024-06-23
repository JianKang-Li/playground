// 自定义Dom类操作dom元素类或其他属性
export default class Dom {
  constructor(dom) {
    this.dom = dom
  }

  addClass(clas) {
    const classNames = clas.splice(' ')
    classNames.forEach((item) => {
      this.dom.classList.add(item)
    })
  }

  removeClass(className) {
    this.dom.classList.remove(className)
  }

  setText(text) {
    this.dom.textContent = text
  }

  getText() {
    return this.dom.textContent || this.dom.innerHTML
  }

  remove() {
    this.dom.remove()
  }
}
