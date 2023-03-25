// 桌面通知
/**
* @param {String} title 通知标题
* @param {String} body 通知信息主体
* 
**/
export default function Notify(title, { body }) {
  if (!("Notification" in window)) {
    new Error("This browser does not support desktop notification")
  }
  else if (Notification.permission === "granted") {
    let notif = new Notification(title, { body })
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        let notif = new Notification(title, { body })
      }
    })
  }
}