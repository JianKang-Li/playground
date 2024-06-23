// 判断长度
export default function len(param) {
  switch (Object.prototype.toString.call(param).slice(8, -1)) {
    case 'Array': {
      return param.length
    } case 'Set': {
      return param.size
    } case 'Function': {
      return param.length
    } case 'Object': {
      return Object.keys(param).length
    } case 'String': {
      return param.length
    } case 'Map': {
      return param.size
    } case 'Undefined': {
      return 0
    } case 'Null': {
      return 0
    } case 'Number': {
      if (param !== param) {
        // NaN
        return 0
      }
      else {
        return param.toString().length
      }
    } case 'BigInt': {
      return param.toString().length
    } case 'Boolean': {
      return param ? 1 : 0
    }
    default: {
      // Date RegExp Symbol
      const type = Object.prototype.toString.call(param).slice(8, -1)
      console.warn(`${type} are not supported`)
    }
  }
}
