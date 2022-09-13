class Local {
  constructor() {
    if (window && window.localStorage) {
      this.local = window.localStorage
    } else {
      throw new Error("There is no local storage for storing data.")
    }
  }

  get(key) {
    return this.local[key]
  }

  getAll() {
    return this.local
  }

  set(key, value) {
    if (typeof key != "string") {
      throw new Error("The key must be String")
    }
    window.localStorage.setItem(key, value)
    this.Update()
  }
  Update() {
    this.local = window.localStorage
  }

  remove(key) {
    window.localStorage.removeItem(key)
    this.Update()
  }
  clear() {
    window.localStorage.clear()
    this.Update()
  }
}
const storage = new Local()

export const LocalStore = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    console.log(mutation)
    console.log(state);
    console.log(storage.getAll());
  })
}

export default storage


