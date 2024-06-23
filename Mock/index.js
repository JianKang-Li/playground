const random = require('./random.js')

// 创建函数
function create(obj) {
  const keys = Object.keys(obj)
  const item = {}
  for (const key of keys) {
    const reqs = obj[key].split(' ')
    const type = reqs[0]
    const len = reqs.length - 1
    switch (type) {
      case 'number': {
        item[key] = random.CNumber(Number.parseInt(reqs[1]), Number.parseInt(reqs[2]) + 1)
        break
      }
      case 'numberStr': {
        item[key] = random.CNumbers(reqs[1], 0, 9).join('')
        break
      }
      case 'string': {
        switch (len) {
          case 1: {
            item[key] = random.CString(reqs[1])
            break
          }
          case 2: {
            item[key] = random.getRandom() >= 0.5 ? random.CString(Number.parseInt(reqs[1])) : random.CString(Number.parseInt(reqs[2]))
            break
          }
        }
        break
      }
      case 'time': {
        item[key] = random.CTime()
        break
      }
      case 'DayTime': {
        item[key] = random.DateTime()
        break
      }
      case 'day': {
        item[key] = random.CDate()
        break
      }
      case 'id': {
        item[key] = random.generateRandom()
        break
      }
      case 'boolean': {
        item[key] = random.CBoolean()
        break
      }
      case 'Bool2Num': {
        item[key] = random.Bool2Num()
        break
      }
    }
  }
  return item
}

// 入口函数
module.exports = function mock(obj, num) {
  const mock = []
  for (let i = 0; i < num; i++) {
    const item = create(obj)
    mock.push(item)
  }
  return mock
}
