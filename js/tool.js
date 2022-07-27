(function (window) {
  // 自定义方法库

  // 使用fetch发送请求
  async function http(obj) {
    let { method, url, param, data } = obj
    let res;
    // param处理
    if (param) {
      let str = new URLSearchParams(param).toString()
      url += "?" + str
    }
    // data处理
    if (data) {
      res = await fetch(url,
        {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
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
        newObj[key] = _completeDeepClone(target[key], map);
      }
    }
    return newObj;
  };

  // 利用Set去重
  function unique(arr) {
    let set = new Set(arr)
    return Array.from(set)
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
  }

  window.tool = tool

})(window)