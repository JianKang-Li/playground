// 原始XHR发送请求
export default class XHR {
  constructor() {
    function use(normal, error) {
      normal && this.normals.push(normal)
      error && this.errors.push(error)
    }

    this.interceptors = {
      request: {
        normals: [],
        errors: [],
        use: use
      },
      response: {
        normals: [],
        errors: [],
        use: use
      },
    }
  }

  dispatch(url, method, data) {
    return new Promise((resolve, reject) => {
      this.interceptors.request.normals.map((fn) => {
        this.xhr = fn(this.xhr)
      })
      this.xhr.open(method, url)
      data ? this.xhr.send(data) : this.xhr.send();
      const _this = this
      this.xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
          let text = JSON.parse(this.responseText)
          _this.interceptors.response.normals.map((fn) => {
            text = fn(text)
          })
          resolve(text)
        } else if (this.status >= 400) {
          _this.interceptors.response.errors.map((fn) => {
            this.statusText = fn(this.statusText)
          })
          reject(this.statusText)
        }
      }
    })
  }

  /**
   * @param {String} url 请求地址
   * @param {String|Array<String>} param get请求参数
   * 
   **/
  get(url, param) {
    try {
      this.xhr = new XMLHttpRequest();
      let _url = url
      if (param) {
        let str = new URLSearchParams(param).toString()
        _url += "?" + str
        _url += "&_t=" + Date.now()
      } else {
        _url += "?_time=" + Date.now()
      }
      return this.dispatch(_url, 'GET')
    } catch (e) {
      this.interceptors.request.errors.map((fn) => {
        e = fn(e)
      })
    }
  }

  /**
  * @param {String} url 请求地址
  * @param {Object} data 请求参数
  * @param {Object} headers 请求头
  * 
  **/
  post(url, data, headers) {
    try {
      this.xhr = new XMLHttpRequest();
      if (headers) {
        this.setHeaders(headers)
      }
      url += `${url}?_t=${Date.now()}`
      return this.dispatch(url, "POST", data)
    } catch (e) {
      this.interceptors.request.errors.map((fn) => {
        e = fn(e)
      })
    }
  }

  setHeaders(headers) {
    for (let head in headers) {
      this.xhr.setRequestHeader(head, headers[head])
    }
  }

  /**
  * 取消请求
  * 
  **/
  abort() {
    this.xhr.abort()
    if (this.xhr.status === 0) {
      return "Abort"
    } else {
      throw new Error(this.xhr.status)
    }
  }
}