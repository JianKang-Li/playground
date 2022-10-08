export function get(option) {
  let doms = document.querySelectorAll(option)
  if (doms.length <= 1) {
    return doms[0]
  } else {
    return doms
  }
}

// 自定义Dom类操作dom元素类或其他属性
export class Dom {
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

// 原始XHR发送请求
export class XHR {
  constructor() {
  }

  get({ url, param }) {
    this.xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      let _url = url
      if (param) {
        let str = new URLSearchParams(param).toString()
        _url += "?" + str
      }
      this.xhr.open("GET", _url)
      this.xhr.send();
      this.xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText)
        } else if (this.status >= 400) {
          reject(this.statusText)
        }
      }
    }
    )
  }

  post({ url, data, headers }) {
    this.xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      this.xhr.open('POST', url)
      if (heads) {
        this.setHeaders(headers)
      }
      this.xhr.send(data)
      this.xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.responseText);
        } else if (this.status >= 400) {
          reject(this.statusText)
        }
      }
    })
  }

  setHeaders(headers) {
    for (let head in headers) {
      this.xhr.setRequestHeader(head, headers[head])
    }
  }

  abort() {
    this.xhr.abort()
    if (this.xhr.status === 0) {
      return "Abort"
    } else {
      throw new Error(this.xhr.status)
    }
  }
}

// 使用fetch发送请求
export class Http {
  constructor() {
  }

  get({ url, param }) {
    return new Promise(async (resolve, reject) => {
      this.controller = new AbortController()
      this.signal = this.controller.signal
      let res;
      if (param) {
        let str = new URLSearchParams(param).toString()
        url += "?" + str
      }
      res = await fetch(url, { signal: this.signal }).then(async (res) => {
        let result = await res.json()
        resolve(result)
      }).catch(function (e) {
        reject(e.message)
      })
    })
  }

  async post({ url, headers, data }) {
    return new Promise(async (resolve, reject) => {
      this.controller = new AbortController()
      this.signal = this.controller.signal
      let res;
      if (headers === undefined) {
        headers = {
          "Content-Type": "application/json"
        }
      }
      if (data) {
        let _data;
        if (headers["Content-Type"] === "application/json") {
          _data = JSON.stringify(data)
        }
        try {
          res = await fetch(url,
            {
              method: "POST",
              headers,
              body: _data,
              signal: this.signal
            })
          let result = await res.json()
          resolve(result)
        } catch (e) {
          reject(e.message)
        }
      }
    })
  }

  httpAbort() {
    this.controller.abort()
  }
}

// 判断对象是否为空
export function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}

// 判断是否相等
export function isEqual(value1, value2) {
  return Object.is(value1, value2)
}

// 获取url某个参数
export function getQueryString(url, name) {
  if (url.indexOf("?") != -1) {
    url = url.split("?")[1]
  }
  let U = new URLSearchParams(url);
  return U.get(name)
}

// 创建随机数字数组
export function CNumbers(n = 5, min = 0, max = 100) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a[i] = Math.floor(Math.random() * (max - min)) + min;
  }
  return a;
};

//创建指定长度的字符串
export function CString(n = 5) {
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let j = 0; j < n; j++) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
};

//创建指定范围内的随机数字
export function CNumber(min = 0, max = 100) {
  let a;
  a = Math.floor(Math.random() * (max - min)) + min;
  return a;
};

//获取当前时间并格式化为（hh:mm:ss）
export function Ctime() {
  let date = new Date();
  let time = date.toTimeString().slice(0, 8)
  return time;
};

// 时间格式化
export function timeFromDate(date) {
  date.toTimeString().slice(0, 8)
}

//获取当前日期并格式化为（YYYY-MM-DD）
export function CDate() {
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
export function dpClone(target, map = new Map()) {
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
export function unique(arr) {
  let set = new Set(arr)
  return Array.from(set)
}

/* 
节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
*/

// 防抖
export function debounce(handle, delay = 1000) {
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
export function throttle(handle, wait = 1000) {
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
export function Sreverse(str) {
  return str.split("").reverse().join("")
}

// 获取数据类型
export function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 快速排序
export function quickSort(arr) {
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
export class Cookie {
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
export class Local {
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
export class Session {
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

// 浮点数运算，解决0.1+0.2!=0.3
export function float(args) {
  return parseFloat((args).toFixed(10))
}

// rgb 转 hex
export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// rem转px
export function rem2px(rem) {
  const docpx = getComputedStyle(document.documentElement)["font-size"]
  let px = rem * parseInt(docpx)
  return px
}

// 比较两个日期之间差的天数
export function dayDif(date1, date2) {
  return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
}

// 事件总线
export class Bus {
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

// 格式化数字
export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

// 获取滚动条位置
export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  } else {
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}

// 获取窗口大小
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: wind.innerWidth,
      h: window.innerHeight
    }
  } else {
    if (document.compatMode === "BackCompat") {
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      }
    } else {
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}

// 获取元素样式
export function getStyle(dom, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(dom, null)[prop]
  } else {
    return dom.currentStyle[prop];
  }
}


// 桌面通知
export function Notify(title, { body }) {
  if (!("Notification" in window)) {
    new Error("This browser does not support desktop notification")
  }
  else if (Notification.permission === "granted") {
    let notif = new Notification(title, { body })
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        let notif = new Notification(title, { body })
      }
    })
  }
}

// 大数相加
export function addBig(a, b) {
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0;   //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = t % 10 + sum;
  }
  if (f !== 0) {
    sum = '' + f + sum;
  }
  return sum;
}

// 阶乘
export function factorial(n) {
  let a = [1];
  for (let i = 1; i <= n; i++) {
    for (let j = 0, c = 0; j < a.length || c != 0; j++) {
      let m = j < a.length ? a[j] * i + c : c;
      a[j] = m % 10;
      c = (m - a[j]) / 10;
    }
  }
  return a.reverse().join("")
}

// 随眠
export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// 重试
export function retry(func, times = 0, delay = 0) {
  return new Promise((resolve, reject) => {
    // func是一件事，将他封装
    let inner = async function () {
      try {
        const result = await func()
        resolve(result)
      } catch (e) {
        if (times-- <= 0) {
          reject(e)
        } else {
          console.log('开始重试,剩余', times);
          // 延时
          setTimeout(() => {
            inner()
          }, delay)
        }
      }
    }
    inner()
  })
}

// 深度冻结
function deepFreeze(obj, attr, deep = 0) {
  const re = function (obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (typeof obj[key] === 'object') {
          deepFreeze(obj, key, 1)
        }
      }
    }
  }
  if (attr == undefined) {
    Object.freeze(obj)
    re(obj)
    return
  } else {
    if (typeof obj[attr] != 'object') {
      Object.defineProperty(obj, attr, {
        writable: false
      })
      return
    }
    Object.freeze(deep === 1 ? obj[attr] : obj);
    re(obj[attr])
  }
}