const container = document.createElement('div')
container.style = 'text-align: center;z-index:100;position: fixed;top: 150px;left: 15px;display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap;width: fit-content;display: flex;'
const body = document.body
let playbackRate = 1

const left = document.createElement('button')
left.innerText = '-'
const rate = document.createElement('span')
rate.innerText = playbackRate
rate.id = 'rate'
rate.style = "user-select: none;background:#ccc;color:#fff;padding: 4px 10px;"
const right = document.createElement('button')
right.innerText = "+"
container.appendChild(left)
container.appendChild(rate)
container.appendChild(right)
body.appendChild(container)

left.addEventListener('click', () => {
  const rate = document.querySelector('#rate')
  playbackRate = Number((playbackRate - 0.1).toFixed(1))
  rate.innerText = playbackRate
  setRate(playbackRate)
})

left.style = 'border: none;background-color: #ccc;color: #fff;padding: 5px 10px;cursor: pointer;border-radius: 5px 0 0 5px;'

right.addEventListener('click', () => {
  const rate = document.querySelector('#rate')
  playbackRate = Number((playbackRate + 0.1).toFixed(1))
  rate.innerText = playbackRate
  setRate(playbackRate)
})

window.addEventListener('wheel', () => {
  setRate(playbackRate)
})

right.style = 'border: none;background-color: #ccc;color: #fff;padding: 5px 10px;cursor: pointer;border-radius: 0 5px 5px 0;'

function setRate(playbackRate) {
  document.querySelectorAll("video").forEach((item) => {
    item.playbackRate = playbackRate;
  });
}