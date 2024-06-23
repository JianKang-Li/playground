export default function isObject(param) {
  return Object.prototype.toString.call(param).slice(8, -1) === 'Object'
}
