const mock = require('./index')

const student = {
  ID: 'id', // id
  name: 'string 2 4', // 字符串
  sex: 'Bool2Num', // 布尔转数字
  phone: 'numberStr 11', // 全数字字符串
  create_time: 'DayTime', // 时间
  author: 'boolean', // 布尔
}

console.warn(mock(student, 10))
