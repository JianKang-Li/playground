let i = 1314
const height = device.height
const width = device.width
setScreenMetrics(width, height)

const window = floaty.window(
  <vertical>
    <text id="text" text="" color="#FAF0E6"></text>
    <button id="stop" text="暂停"></button>
  </vertical>,
)
window.setPosition(300, 300)
window.setSize(500, 300)
window.setAdjustEnabled(true)
window.exitOnClose()
setInterval(() => {}, 1000)

window.stop.click(() => {
  zt = window.stop.getText()
  if (zt === '暂停') {
    toast('脚本已暂停')
    ui.run(() => {
      window.stop.setText('开始')
    })
  }
  else {
    toast('脚本已继续')
    ui.run(() => {
      window.stop.setText('暂停')
    })
  }
})

while (i > 1) {
  ui.run(() => {
    window.text.setText(`剩余次数为：${i}次`)
  })
  if (window.stop.getText() === '暂停') {
    i--
    click(device.width / 2, device.height / 2)
    sleep(100)
    ui.run(() => {
      window.text.setText('')
    })
  }
}
