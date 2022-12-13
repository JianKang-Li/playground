// 自定义Dom类操作dom元素类或其他属性
export default class Dom {
  constructor(dom) {
    this.dom = dom
  }

  addClass(clas) {
    let classNames = clas.splice(" ")
    classNames.forEach(item => {
      this.dom.classList.add(item)
    })
  }

  removeClass(className) {
    this.dom.classList.remove(className)
  }

  setText(text) {
    this.dom.innerText = text
  }

  getText() {
    return this.dom.innerText || this.dom.innerHTML
  }

  remove() {
    this.dom.remove()
  }
}