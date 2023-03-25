// 创建元素
/**
* @param {String} type 元素标签
* @param {Object} props 属性 
* @param {String|Object} children 元素子元素
**/
export default function createElement(type, props, children) {
  let el;
  if (type === 'text') {
    el = document.createTextNode(props)
  } else {
    el = document.createElement(type)
    for (let key in props) {
      switch (key) {
        case 'style': {
          const style = props['style']
          for (let attr in style) {
            el.style[attr] = style[attr]
          }
          break;
        } case 'events': {
          const events = props['events']
          for (let attr in events) {
            el.addEventListener(attr, events[attr])
          }
          break;
        } case "attrs": {
          const datas = props['attrs']
          for (let attr in datas) {
            el.setAttribute(attr, datas[attr])
          }
          break;
        }
        default: {
          break;
        }
      }
    }


    function processChildren(el, children) {
      if (children) {
        switch (typeof children) {
          case "string": {
            el.innerHTML += children
            break;
          }
          case 'object': {
            if (!Array.isArray(children)) {
              el.appendChild(children)
            } else {
              for (let i in children) {
                processChildren(el, children[i])
              }
            }
            break;
          }
          default: {
            console.log(typeof children);
            break;
          }
        }
      }
    }

    if (children) {
      processChildren(el, children)
    }
  }
  return el
}