const container = document.createElement('div')
container.style = 'background:#ccc;color:#fff;border-radius: 5px;text-align: center;z-index:9999;position: fixed;top: 20px;left: 10px;display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap;width: fit-content;display: flex;'
const body = document.body
container.id = 'speedControl'
let playbackRate = 1

const left = document.createElement('button')
left.textContent = '-'
const rate = document.createElement('span')
rate.textContent = playbackRate
rate.id = 'rate'
rate.title = '点击还原'
rate.style = 'user-select: none;padding: 4px 10px;cursor:pointer;'
rate.addEventListener('click', function () {
  playbackRate = 1
  this.textContent = playbackRate
  setRate()
})

const right = document.createElement('button')
right.textContent = '+'
container.appendChild(left)
container.appendChild(rate)
container.appendChild(right)
body.appendChild(container)

left.addEventListener('click', () => {
  const rate = document.querySelector('#rate')
  playbackRate = Number((playbackRate - 0.1).toFixed(1))
  rate.textContent = playbackRate
  setRate()
})

left.style = 'border: none;padding: 5px 10px;cursor: pointer;background:#ccc;color:#fff;border-radius: 5px;'

right.addEventListener('click', () => {
  const rate = document.querySelector('#rate')
  playbackRate = Number((playbackRate + 0.1).toFixed(1))
  rate.textContent = playbackRate
  setRate()
})

window.addEventListener('wheel', () => {
  setRate()
})

window.addEventListener('keydown', () => {
  setRate()
})

right.style = 'border: none;padding: 5px 10px;cursor: pointer;background:#ccc;color:#fff;border-radius: 5px;'

function setRate() {
  document.querySelectorAll('video').forEach((item) => {
    item.playbackRate = playbackRate
    item.addEventListener('ended', () => {
      setRate(playbackRate)
    })
  })
}
