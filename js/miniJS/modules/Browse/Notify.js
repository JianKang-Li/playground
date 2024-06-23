// 桌面通知
/**
 * @param {string} title 通知标题
 * @param {string} body 通知信息主体
 *
 */
export default function Notify(title, { body }) {
  if (!('Notification' in window)) {
    new Error('This browser does not support desktop notification')
  }
  else if (Notification.permission === 'granted') {
    new Notification(title, { body })
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted')
        new Notification(title, { body })
    })
  }
}
