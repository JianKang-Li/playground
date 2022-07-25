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


  let tool = {
    http: http
  }

  window.tool = tool

})(window)