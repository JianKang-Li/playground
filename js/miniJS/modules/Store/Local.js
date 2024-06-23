// localStorage
export default class Local {
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
    if (typeof key !== 'string')
      throw new Error('The key must be String')

    localStorage.setItem(key, value)
    this.Update()
  }

  Update() {
    this.local = localStorage
  }

  del(key) {
    if (!key || !this.local[key])
      return false
    localStorage.removeItem(key)
    this.Update()
    return true
  }

  clear() {
    localStorage.clear()
    this.Update()
  }
}
