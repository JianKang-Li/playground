const random = require('./random.js')

// 创建函数
function create(obj) {
  let keys = Object.keys(obj)
  let item = {}
  for (let key of keys) {
    let reqs = obj[key].split(' ')
    let type = reqs[0]
    let len = reqs.length - 1
    switch (type) {
      case 'number': {
        item[key] = random.CNumber(parseInt(reqs[1]), parseInt(reqs[2]) + 1)
        break;
      }
      case 'numberStr': {
        item[key] = random.CNumbers(reqs[1], 0, 9).join('')
        break;
      }
      case 'string': {
        switch (len) {
          case 1: item[key] = random.CString(reqs[1]);
          case 2: item[key] = random.getRandom() >= 0.5 ? random.CString(parseInt(reqs[1])) : random.CString(parseInt(reqs[2]));
        }
        break;
      }
      case 'time': {
        item[key] = random.CTime()
        break;
      }
      case 'DayTime': {
        item[key] = random.DateTime()
        break;
      }
      case 'day': {
        item[key] = random.CDate()
        break;
      }
      case 'id': {
        item[key] = random.generateRandom()
        break;
      }
      case 'boolean': {
        item[key] = random.CBoolean()
        break;
      }
      case 'Bool2Num': {
        item[key] = random.Bool2Num()
        break;
      }
    }
  }
  return item
}

// 入口函数
module.exports = function mock(obj, num) {
  let mock = []
  for (let i = 0; i < num; i++) {
    let item = create(obj)
    mock.push(item)
  }
  return mock
}