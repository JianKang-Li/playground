// sessionStorage
export default class Session {
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
    if (typeof key != 'string')
      throw new Error('The key must be String')

    sessionStorage.setItem(key, value)
    this.Update()
  }

  Update() {
    this.session = sessionStorage
  }

  del(key) {
    if (!key || !this.session[key])
      return false
    sessionStorage.removeItem(key)
    this.Update()
    return true
  }

  clear() {
    sessionStorage.clear()
    this.Update()
  }
}
