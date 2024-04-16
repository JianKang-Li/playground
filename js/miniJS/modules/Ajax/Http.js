// 使用fetch发送请求
export default class Http {
  constructor() {
    function use(normal, error) {
      normal && this.normals.push(normal)
      error && this.errors.push(error)
    }

    this.interceptors = {
      request: {
        normals: [],
        errors: [],
        use,
      },
      response: {
        normals: [],
        errors: [],
        use,
      },
    }
  }

  /**
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   *
   */
  dispatch(url, data) {
    return new Promise(async (resolve, reject) => {
      this.controller = new AbortController()
      this.signal = this.controller.signal
      data = Object.assign(data, { signal: this.signal })
      this.interceptors.request.normals.forEach((fn) => {
        data = fn(data)
      })
      const _this = this
      await fetch(url, data).then(async (res) => {
        let result = await res.json()
        _this.interceptors.response.normals.forEach((fn) => {
          result = fn(result)
        })
        resolve(result)
      }).catch((e) => {
        _this.interceptors.response.errors.forEach((fn) => {
          e = fn(e)
        })
        reject(e)
      })
    })
  }

  /**
   * @param {string} url 请求地址
   * @param {string | Array<string>} param get请求参数
   *
   */
  get(url, param) {
    try {
      if (param) {
        const str = new URLSearchParams(param).toString()
        url += `?${str}`
        url += `&_t=${Date.now()}`
      }
      else {
        url += `?_time=${Date.now()}`
      }
      const promise = this.dispatch(url, { method: 'GET' })
      return promise
    }
    catch (e) {
      this.interceptors.request.errors.forEach((fn) => {
        fn(e)
      })
    }
  }

  /**
   * @param {string} url 请求地址
   * @param {object} data 请求参数
   * @param {object} headers 请求头
   *
   */
  post(url, data, headers) {
    try {
      if (headers === undefined) {
        headers = {
          'Content-Type': 'application/json',
        }
      }
      let _data
      if (data) {
        if (headers['Content-Type'] === 'application/json')
          _data = JSON.stringify(data)
      }
      url += `${url}?_t=${Date.now()}`
      return this.dispatch(url, { headers, body: _data, method: 'POST' })
    }
    catch (e) {
      this.interceptors.request.errors.forEach((fn) => {
        fn(e)
      })
    }
  }

  /**
   * 取消请求
   *
   */
  httpAbort() {
    this.controller.abort()
  }
}
