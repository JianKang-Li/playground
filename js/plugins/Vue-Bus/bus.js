class Bus {
  constructor() {
    this.bus = {}
  }

  on(name, fn) {
    if (!this.bus[name]) {
      this.bus[name] = fn
    } else {
      throw new Error(`${name} has been on`)
    }
  }

  emit(name, ...data) {
    if (this.bus[name]) {
      this.bus[name].apply(this, data)
      if (this.bus[name]._once === true) {
        this.off(name)
      }
    } else {
      throw new Error(`Can't find ${name}`)
    }
  }

  off(name) {
    // 判断是否全部删除
    if (name === undefined) {
      this.bus = {}
    } else {
      // 判断是否存在对应事件
      if (this.bus[name]) {
        delete this.bus[name]
      } else {
        throw new Error(`Can't find ${name}`)
      }
    }
  }

  once(name, fn) {
    if (!this.bus[name]) {
      this.bus[name] = fn
      // 增加只触发一次标志
      this.bus[name]._once = true
    } else {
      throw new Error(`${name} has been on`)
    }
  }
}

const install = (Vue) => {
  if (install.installed) return;
  install.installed
  Vue.prototype.$bus = new Bus()
}

// 环境检测
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
