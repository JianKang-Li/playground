let lastSrcs

const scriptReg = /<script.*src=["'](?<src>[^"']+)/gm

async function extractNewScripts() {
  const html = await fetch(`/?_timestamp=${Date.now()}`).then(
    (resp) => {
      resp.text()
    },
  )
  scriptReg.lastIndex = 0
  const result = []
  let match
  while ((match = scriptReg.exec(html)))
    result.push(match.groups.src)

  return result
}

async function needUpdate() {
  const newScripts = await extractNewScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  let result = false
  if (lastSrcs.length !== newScripts.length)
    result = true

  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true
      break
    }
  }
  lastSrcs = newScripts
  return result
}

const DURATION = 2000
const autoI = setInterval(async () => {
  const willUpdate = await needUpdate()
  if (willUpdate) {
    const result = confirm('有更新，点击确定刷新页面')
    if (result)
      location.reload()
  }
  else {
    console.warn('1')
  }
}, DURATION)

export default autoI
