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

  get(url, param) {
    try {
      this.xhr = new XMLHttpRequest();
      let _url = url
      if (param) {
        let str = new URLSearchParams(param).toString()
        _url += "?" + str
      }
      return this.dispatch(_url, 'GET')
    } catch (e) {
      this.interceptors.request.errors.map((fn) => {
        e = fn(e)
      })
    }
  }

  post(url, data, headers) {
    try {
      this.xhr = new XMLHttpRequest();
      if (headers) {
        this.setHeaders(headers)
      }
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

  abort() {
    this.xhr.abort()
    if (this.xhr.status === 0) {
      return "Abort"
    } else {
      throw new Error(this.xhr.status)
    }
  }
}