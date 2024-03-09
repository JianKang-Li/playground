class Util {
  constructor() {
    this.body = document.body
  }

  bind(el, func) {
    el.addEventListener(func)
  }

  attrs(el, attributes) {
    for (const key of Object.keys(attributes)) {
      el.setAttribute(key, attributes[key])
    }
  }

  createEle(type, classes, attrs) {
    const el = document.createElement(type)

    el.className = classes
    this.attrs(el, attrs)

    return el
  }
}

