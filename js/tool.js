(function (window) {
  // 自定义方法库
  "use strict"
  // 获取dom元素,通过css选择器选择
  function get(option) {
    let doms = document.querySelectorAll(option)
    if (doms.length <= 1) {
      return doms[0]
    } else {
      return doms
    }
  }

  // 自定义Dom类操作dom元素类或其他属性
  class Dom {
    constructor(dom) {
      this.dom = dom
    }
    addClass(className) {
      this.dom.classList.add(className)
    }
    removeClass(className) {
      this.dom.classList.remove(className)
    }
  }

  // 使用fetch发送请求
  async function http(obj, headers) {
    let { method, url, param, data } = obj
    headers === null ? {
      "Content-Type": "application/json"
    } : headers
    let res;
    // param处理
    if (param) {
      let str = new URLSearchParams(param).toString()
      url += "?" + str
    }
    // data处理
    if (data) {
      let _data = undefined;
      if (headers["Content-Type"] === "application/json") {
        _data = JSON.stringify(data)
      } else {
        _data = new FormData()
        let keys = Object.keys(data)
        for (let i of keys) {
          _data.append(i, data[i])
        }
      }
      res = await fetch(url,
        {
          method: method,
          headers,
          body: _data
        })
    } else {
      res = await fetch(url)
    }
    // 处理返回结果
    return res.json()
  }

  // 创建随机数字数组
  function CNumbers(n, min, max) {
    let a = [];
    for (let i = 0; i < n; i++) {
      a[i] = Math.floor(Math.random() * (max - min)) + min;
    }
    return a;
  };

  //创建指定长度的字符串
  function CString(n) {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let j = 0; j < n; j++) {
      result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
  };

  //创建指定范围内的随机数字
  function CNumber(min, max) {
    let a;
    a = Math.floor(Math.random() * (max - min)) + min;
    return a;
  };

  //获取当前时间并格式化为（hh:mm:ss）
  function Ctime() {
    let date = new Date();
    let time =
      date.getHours().toString().padStart(2, 0) +
      ":" +
      date.getMinutes().toString().padStart(2, 0) +
      ":" +
      date.getSeconds().toString().padStart(2, 0);
    return time;
  };

  //获取当前日期并格式化为（YYYY-MM-DD）
  function CDate() {
    let date = new Date();
    let day =
      date.getFullYear().toString().padStart(4, 0) +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0);
    return day;
  };

  //深度复制
  function dpClone(target, map = new Map()) {
    if (target.constructor === Date) {
      return new Date(target);
    }
    if (target.constructor === RegExp) {
      return new RegExp(target);
    }
    if (target instanceof Error) return new Error(target.message);
    if (target instanceof Function)
      return function proxy(...args) {
        return target.call(this, args);
      };
    if (typeof target != "object") return target;
    if (map.has(target)) return map.get(target);
    let newObj = new target.constructor();
    map.set(target, newObj);
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        newObj[key] = dp(target[key], map);
      }
    }
    return newObj;
  };

  // 利用Set去重
  function unique(arr) {
    let set = new Set(arr)
    return Array.from(set)
  }

  /* 
  节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
  防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
  */

  // 防抖
  function debounce(handle, delay) {
    var timer = null;
    return function () {
      var _self = this, _args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        handle.apply(_self, _args)
      }, delay)
    }
  }

  // 节流
  function throttle(handle, wait) {
    var lasetTime = 0;
    return function () {
      var nowTime = new Data().getTime();
      if (nowTime - lasetTime > wait) {
        handle.apply(this, arguments);
        lasetTime = nowTime
      }
    }
  }

  // 字符串反转
  function Sreverse(str) {
    return str.split("").reverse().join("")
  }

  // 获取数据类型
  function type(obj) {
    let type = typeof obj
    if (type != "object") {
      return type
    } else {
      if (obj instanceof Array) {
        return "array"
      } else if (obj === null) {
        return "null"
      } else {
        return "object"
      }
    }
  }

  // 快速排序
  function quickSort(arr) {
    if (!Array.isArray(arr)) return;
    if (arr.length <= 1) return arr;
    var left = [],
      right = [];
    var num = Math.floor(arr.length / 2);
    var numValue = arr.splice(num, 1)[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > numValue) {
        right.push(arr[i]);
      } else {
        left.push(arr[i]);
      }
    }
    return [...quickSort(left), numValue, ...quickSort(right)];
  }

  // 获取cookie
  class Cookie {
    constructor() {
      this.cookies = document.cookie
      let _cookie = this.cookies.split(";")
      this.cookiesObj = {}
      _cookie.forEach(item => {
        let key = item.split("=")[0].trim()
        let value = item.split("=")[1].trim()
        this.cookiesObj[key] = value
      })
    }
    getCookies() {
      return this.cookiesObj
    }

    getCookie(key) {
      return this.cookiesObj[key]
    }
  }

  // localStorage
  class Local {
    constructor() {
      this.local = localStorage
    }
    getAll() {
      return this.local
    }
    find(key) {
      return this.local[key]
    }
    set(key, value) {
      if (typeof key != "string") {
        throw new Error("The key must be String")
      }
      localStorage.setItem(key, value)
      this.Update()
    }
    Update() {
      this.local = localStorage
    }
    del(key) {
      localStorage.removeItem(key)
      this.Update()
    }
    clear() {
      localStorage.clear()
      this.Update()
    }
  }

  // sessionStorage
  class Session {
    constructor() {
      this.session = sessionStorage
    }
    getAll() {
      return this.session
    }
    find(key) {
      return this.session[key]
    }
    set(key, value) {
      if (typeof key != "string") {
        throw new Error("The key must be String")
      }
      sessionStorage.setItem(key, value)
      this.Update()
    }
    Update() {
      this.session = sessionStorage
    }
    del(key) {
      sessionStorage.removeItem(key)
      this.Update()
    }
    clear() {
      sessionStorage.clear()
      this.Update()
    }
  }

  function float(args) {
    return parseFloat((args).toFixed(15))
  }

  let tool = {
    unique,
    http,
    CNumber,
    CNumbers,
    CString,
    Ctime,
    dpClone,
    CDate,
    get,
    debounce,
    throttle,
    Sreverse,
    type,
    quickSort,
    Dom,
    Cookie,
    Local,
    Session,
    float
  }

  window.tool = tool

})(window)