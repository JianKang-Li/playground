const colors = [
  '#1D8FE1',
  '#22E1FF',
  '#FFA99F',
  '#FF719A',
  '#E2E7ED',
  '#FFE6FA',
  '#D7FFFE',
  '#46aef7',
  '#a1c4fd',
  '#c2e9fb',
  '#f3f2f2',
  '#eaecd4',
  '#edeae6',
  '#efebd5',
  '#f3eae0',
  '#e8eaed',
  '#eae7b4',
  '#c0ced5',
  '#a0bfc4',
  '#82aab4',
  '#72a8af',
  '#4a8e99',
  '#458287',
  '#627e90',
  '#539c8a',
  '#f2db43',
  '#5cb787',
  '#70a498',
  '#47af52',
  '#36957a',
  '#2f8c58',
  '#246c49',
  '#1db561',
  '#b4c3d0',
  '#8bb8cb',
  '#91aec4',
  '#238bbc',
  '#1988ae',
  '#2a73ac',
  '#4d779a',
  '#5796b3',
  '#f13a57',
  '#eb3738',
  '#e84f34',
  '#e91c0c',
  '#c13c5a',
  '#c33141',
  '#95242d',
  '#965565',
  '#f2db43',
  '#f1ca23',
  '#e9ba1b',
  '#efaf10',
  '#f3a01d',
  '#e4d32b',
  '#d3a31d',
  '#d2b360',
  '#e77345',
  '#ea8637',
  '#de5c1d',
  '#d13b0e',
  '#de5822',
  '#d15726',
  '#bf522f',
  '#943917',
  '#e2acba',
  '#e294aa',
  '#e37c9b',
  '#de507c',
  '#e4787f',
  '#db7586',
  '#e199a1',
  '#e3698a',
  '#605756',
  '#5d5259',
  '#3f3e44',
  '#160f16',
  '#0d0d19',
  '#1a1a1a',
  '#353631',
  '#2a2a26',
  '#9e8174',
  '#8f6d58',
  '#8c5643',
  '#804913',
  '#76412f',
  '#673225',
  '#482b27',
  '#7b361f',
  '#dcd9d0',
  '#c8c6c1',
  '#b0b4b7',
  '#aaaeaf',
  '#a49d94',
  '#8d7b72',
  '#646056',
  '#858888',
  '#9d95bd',
  '#b87fab',
  '#ba7297',
  '#7c3c83',
  '#7f6e99',
  '#7c5d8e',
  '#89286e',
  '#785696',
]

const fragment = document.createDocumentFragment()
for (let i = 0; i < colors.length; i++) {
  const div = document.createElement('div')
  div.setAttribute('class', 'item')
  div.style.backgroundColor = colors[i]
  div.textContent = colors[i].toLocaleUpperCase()
  fragment.appendChild(div)
}

const show = document.querySelector('#show')
show.appendChild(fragment)
show.addEventListener('click', (e) => {
  const clip = navigator.clipboard
  if (clip)
    clip.writeText(e.target.textContent)
})

function transRgb(color) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  let sColor = color.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor
          .slice(i, i + 1)
          .concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i <= 6; i += 2)
      sColorChange.push(Number.parseInt(`0x${sColor.slice(i, i + 2)}`))

    return `rgb(${sColorChange.join(',')})`
  }
  else {
    return sColor
  }
}

function rgbToHex(color) {
  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')
  const a = Number.parseFloat(values[3] || 1)
  const r = Math.floor(a * Number.parseInt(values[0]) + (1 - a) * 255)
  const g = Math.floor(a * Number.parseInt(values[1]) + (1 - a) * 255)
  const b = Math.floor(a * Number.parseInt(values[2]) + (1 - a) * 255)
  return (
    `#${
     (`0${r.toString(16)}`).slice(-2)
         }${(`0${g.toString(16)}`).slice(-2)
         }${(`0${b.toString(16)}`).slice(-2)}`
  )
}

function trans() {
  const color = document.querySelector('#pre').value
  const span = document.querySelector('#after')
  let after
  switch (color[0]) {
    case '#': {
      after = transRgb(color)
      break
    }
    case 'r': {
      after = rgbToHex(color)
      break
    }
  }
  // console.log(after);
  span.textContent = after
}

const btn = document.querySelector('#tran')
const color = document.querySelector('.color')
const pre = document.querySelector('#pre')

btn.addEventListener('click', () => {
  trans()
  value = pre.value.trim()
  switch (value.length) {
    case 4: {
      color.value = rgbToHex(transRgb(value))
      break
    }
    case 7: {
      color.value = value
      break
    }
    default: {
      color.value = rgbToHex(value)
    }
  }
})
