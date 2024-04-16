// 多标签页通信
/**
 *
 *
 *
 */
export function sendMsg(type, payload) {
  localStorage.setItem(`@@${type}`, JSON.stringify({
    payload,
    temp: Date.now(),
  }))
}

export function listenMsg(handler) {
  const storageHandler = (e) => {
    const data = JSON.parse(e.newValue)
    handler(e.key.substring(2), data.payload)
  }

  window.addEventListener('storage', storageHandler)
  return () => {
    window.removeEventListener('storage', storageHandler)
  }
}
