// 创建元素
/**
 * @param {string} type 元素标签
 * @param {object} props 属性
 * @param {string | object} children 元素子元素
 */
export default function createElement(type, props, children) {
  let el
  if (type === 'text') {
    el = document.createTextNode(props)
  }
  else {
    el = document.createElement(type)
    for (const key in props) {
      switch (key) {
        case 'style': {
          const style = props.style
          for (const attr in style)
            el.style[attr] = style[attr]

          break
        } case 'events': {
          const events = props.events
          for (const attr in events)
            el.addEventListener(attr, events[attr])

          break
        } case 'attrs': {
          const datas = props.attrs
          for (const attr in datas)
            el.setAttribute(attr, datas[attr])

          break
        }
        default: {
          break
        }
      }
    }

    function processChildren(el, children) {
      if (children) {
        switch (typeof children) {
          case 'string': {
            el.innerHTML += children
            break
          }
          case 'object': {
            if (!Array.isArray(children)) {
              el.appendChild(children)
            }
            else {
              for (const i in children)
                processChildren(el, children[i])
            }
            break
          }
          default: {
            console.log(typeof children)
            break
          }
        }
      }
    }

    if (children)
      processChildren(el, children)
  }
  return el
}
