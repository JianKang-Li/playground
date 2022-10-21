; (function (window) {
  // 自定义方法库
  "use strict"

  //#region DOM元素操作
  /**
  * DOM元素操作
  **/

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

  // 获取滚动条位置
  function getScrollOffset() {
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
  function getViewportOffset() {
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
  function getStyle(dom, prop) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(dom, null)[prop]
    } else {
      return dom.currentStyle[prop];
    }
  }

  // 创建元素
  function createElement(type, props, children) {
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

  //#endregion

  //#region ajax请求
  /**
  * ajax请求
  **/

  // 原始XHR发送请求
  class XHR {
    constructor() {
    }

    get(url, param) {
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
        if (headers) {
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
  class Http {
    constructor() {
    }

    get(url, param) {
      return new Promise(async (resolve, reject) => {
        this.controller = new AbortController()
        this.signal = this.controller.signal
        if (param) {
          let str = new URLSearchParams(param).toString()
          url += "?" + str
        }
        await fetch(url, { signal: this.signal }).then(async (res) => {
          let result = await res.json()
          resolve(result)
        }).catch(function (e) {
          reject(e.message)
        })
      })
    }

    post({ url, headers, data }) {
      return new Promise(async (resolve, reject) => {
        this.controller = new AbortController()
        this.signal = this.controller.signal
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
            await fetch(url,
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

  // 获取url某个参数
  function getQueryString(url, name) {
    if (url.indexOf("?") != -1) {
      url = url.split("?")[1]
    }
    let U = new URLSearchParams(url);
    return U.get(name)
  }

  // 最大并发数
  function concurRequest(urls, maxNum) {
    return new Promise((resolve) => {
      if (urls.length === 0) {
        resolve([]);
        return;
      }
      const results = [];
      let index = 0; //下一个请求下标
      let count = 0; //当前请求完成数量
      async function request() {
        if (index === urls.length) {
          return;
        }
        const i = index;
        const url = urls[index];
        index++;
        try {
          const resp = await fetch(url); //发送请求
          results[i] = resp;
        } catch (err) {
          results[i] = err;
        } finally {
          // 判断是否所有请求完成
          count++;
          if (count === urls.length) {
            resolve(results);
          }
          request();
        }
      }
      const times = Math.min(maxNum, urls.length);
      for (let i = 0; i < times; i++) {
        request();
      }
    });
  }

  // 自动重试
  function retry(func, times = 1, delay = 0) {
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
  //#endregion

  //#region 时间操作方法
  /**
  * 时间操作方法
  **/

  //获取当前时间并格式化为（hh:mm:ss）
  function Ctime() {
    let date = new Date();
    let time = date.toTimeString().slice(0, 8)
    return time;
  };

  // 时间格式化
  function timeFromDate(date) {
    return date.toTimeString().slice(0, 8)
  }

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

  // 比较两个日期之间差的天数
  function dayDif(date1, date2) {
    if (typeof date1 === 'number') {
      date1 = new Date(date1)
    }
    if (typeof date2 === 'number') {
      date2 = new Date(date2)
    }
    let start = new Date(`${date1.getFullYear()}-${date1.getMonth()}-${date1.getDate()}`)
    let end = new Date(`${date2.getFullYear()}-${date2.getMonth()}-${date2.getDate()}`)
    return Math.ceil(Math.abs(start.getTime() - end.getTime()) / 86400000)
  }

  // 返回当月第一天和最后一天
  function getFirsLastDay() {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    firstDay = y + "-" + (firstDay.getMonth() + 1) + "-" + "01";
    lastDay = y + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate();
    return [firstDay, lastDay];
  }
  //#endregion

  //#region cookie,session,localStorage操作
  /**
  * cookie,session,localStorage操作
  **/
  // 获取cookie
  class Cookie {
    getItem(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
    setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    }

    removeItem(sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    }

    hasItem(sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    keys() {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
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
      if (!key || !this.local[key]) return false;
      localStorage.removeItem(key)
      this.Update()
      return true
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
      if (!key || !this.session[key]) return false;
      sessionStorage.removeItem(key)
      this.Update()
      return true
    }
    clear() {
      sessionStorage.clear()
      this.Update()
    }
  }
  //#endregion

  //#region 类型操作
  /**
  * 类型操作
  **/
  // 获取数据类型
  function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  }

  function isObject(param) {
    return Object.prototype.toString.call(param).slice(8, -1) === 'Object'
  }

  function isArray(param) {
    return Array.isArray(param)
  }

  function isFunction(param) {
    return typeof param === 'function'
  }

  function isString(param) {
    return typeof param === 'string'
  }
  //#endregion

  //#region 判断操作
  /**
  * 判断操作
  **/
  // 判断对象是否为空
  function isEmpty(obj) {
    return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
  }

  // 判断是否相等
  function isEqual(value1, value2) {
    return Object.is(value1, value2)
  }
  //#endregion

  //#region 字符串操作
  /**
  * 字符串操作
  **/
  // 转大写
  function toUp(str) {
    return str.toUpperCase();
  }

  // 转小写
  function toLow(str) {
    return str.toLowerCase();
  }

  // 首字母大写
  function FUp(str) {
    return str[0].toUpperCase() + str.substr(1).toLowerCase();
  }

  // 字符串反转
  function Sreverse(str) {
    return str.split("").reverse().join("")
  }
  //#endregion

  //#region 数字操作
  /**
  * 数字操作
  **/
  // 浮点数运算，解决0.1+0.2!=0.3
  function float(args) {
    return parseFloat((args).toFixed(10))
  }

  // 格式化数字
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  // 大数相加
  function addBig(a, b) {
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
  function factorial(n) {
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
  //#endregion

  //#region 对象操作
  /**
  * 对象操作
  **/
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
        newObj[key] = dpClone(target[key], map);
      }
    }
    return newObj;
  };

  // 对象深度冻结
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
  //#endregion

  //#region 数组操作
  /**
  * 数组操作
  **/
  // 利用Set去重
  function unique(arr) {
    let set = new Set(arr)
    return Array.from(set)
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

  // 数组对象去重
  function uniqueArrayObject(arr = [], key) {
    if (arr.length === 0) return;
    let list = [];
    let map = {};
    arr.forEach((ele) => {
      if (!map[ele[key]]) {
        map[ele[key]] = ele;
      }
    });
    list = Object.values(map);
    return list;
  }

  // 数组之间去重
  function diffArray(arr1, arr2) {
    let newArr = []
    arr1.map((item) => {
      if (arr2.indexOf(item) === -1) {
        newArr.push(item)
      }
    })
    return newArr
  }

  // 切片
  function dropArray(arr, n = 1) {
    return arr.slice(n)
  }

  // 右切片
  function dropArrayR(arr, n = 1) {
    return arr.slice(0, -n)
  }

  // 移除
  function ArrayRemove(arr, fn) {
    switch (typeof fn) {
      case 'number': {
        arr.forEach((item, index) => {
          if (item === fn) {
            arr.splice(index, 1)
          }
        })
        break;
      }
      case "string": {
        arr.forEach((item, index) => {
          if (item === fn) {
            arr.splice(index, 1)
          }
        })
        break;
      }
      case 'function': {
        arr.forEach((item, index) => {
          if (Boolean(fn(item))) {
            arr.splice(index, 1)
          }
        })
        break;
      }
      default:
        console.error("ArrayRemove expect to receive a number or method or string!");
    }
  }
  //#endregion

  //#region 函数操作
  /**
  * 函数操作
  **/
  // 函数柯西化
  function curry(fn, ...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    } else {
      return function (..._args) {
        return curry(fn, ..._args, ...args)
      }
    }
  }

  /* 
  节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
  防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
  */

  // 防抖
  function debounce(handle, delay = 1000) {
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
  function throttle(handle, wait = 1000) {
    var lasetTime = 0;
    return function () {
      var nowTime = new Data().getTime();
      if (nowTime - lasetTime > wait) {
        handle.apply(this, arguments);
        lasetTime = nowTime
      }
    }
  }

  // sleep()
  function sleep(delay = 1000) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
  //#endregion

  //#region 转换
  /**
  * 单位转换
  **/
  // rgb 转 hex
  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // rem转px
  function rem2px(rem) {
    const docpx = getComputedStyle(document.documentElement)["font-size"]
    let px = rem * parseInt(docpx)
    return px
  }
  //#endregion

  //#region 事件总线
  /**
  * 事件总线
  **/
  // 事件总线
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
  //#endregion

  //#region 浏览器原生方法
  /**
  * 浏览器原生方法
  **/

  // 桌面通知
  function Notify(title, { body }) {
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

  function Copy(text) {
    let theClipboard = navigator.clipboard;

    if (theClipboard) {
      let promise = theClipboard.writeText(text)
      return promise
    } else {
      // 兼容不支持clipboard
      let copyInput = document.createElement('input');//创建input元素
      document.body.appendChild(copyInput);//向页面底部追加输入框
      copyInput.setAttribute('value', text);//添加属性，将url赋值给input元素的value属性
      copyInput.select();//选择input元素
      document.execCommand("Copy");//执行复制命令
      copyInput.remove();//删除动态创建的节点
    }
  }

  function browserType() {
    const explorer = window.navigator.userAgent.toLowerCase()
    // console.log(explorer);
    const isIE = !!window.ActiveXObject;
    const isIE6 = isIE && !window.XMLHttpRequest;
    const isIE8 = isIE && !!document.documentMode;
    const isIE7 = isIE && !isIE6 && !isIE8;
    if (isIE) {
      if (isIE6) {
        return "ie6";
      } else if (isIE8) {
        return "ie8";
      } else if (isIE7) {
        return "ie7";
      }
    }
    if (explorer.indexOf("msie") >= 0) {
      return 'IE'
    } else if (explorer.indexOf("firefox") >= 0) {
      return "Firefox"
    } else if (explorer.indexOf("edg") >= 0) {
      return 'Edge'
    } else if (explorer.indexOf("chrome") >= 0) {
      return "Chrome"
    } else if (explorer.indexOf("opera") >= 0 || explorer.indexOf("opr") > -1) {
      return "Opera"
    } else if (explorer.indexOf("safari") >= 0) {
      return "Safari"
    } else {
      return 'unknow'
    }
  }
  //#endregion

  let tool = {
    //#region 库信息
    VERSION: '0.1.0',
    //#endregion

    //#region 浏览器
    Notify,
    Copy,
    browserType,
    //#endregion

    //#region 事件总线
    Bus,
    //#endregion

    //#region 转换
    rgbToHex,
    rem2px,
    //#endregion

    //#region 函数
    curry,
    debounce,
    throttle,
    sleep,
    //#endregion

    //#region 数组
    unique,
    quickSort,
    uniqueArrayObject,
    diffArray,
    dropArray,
    dropArrayR,
    ArrayRemove,
    //#endregion

    //#region 对象
    dpClone,
    deepFreeze,
    //#endregion

    //#region 数字
    float,
    formatNumber,
    addBig,
    factorial,
    //#endregion

    //#region 字符串
    toUp,
    toLow,
    FUp,
    Sreverse,
    //#endregion

    //#region DOM
    get,
    Dom,
    getScrollOffset,
    getViewportOffset,
    getStyle,
    createElement,
    //#endregion

    //#region ajax
    XHR,
    Http,
    getQueryString,
    concurRequest,
    retry,
    //#endregion

    //#region 时间
    Ctime,
    timeFromDate,
    CDate,
    dayDif,
    getFirsLastDay,
    //#endregion

    //#region cookie
    Cookie,
    Local,
    Session,
    //#endregion

    //#region 类型
    type,
    isObject,
    isArray,
    isFunction,
    isString,
    //#endregion

    //#region 判断
    isEmpty,
    isEqual,
    //#endregion
  }

  window.tool = tool

})(window)