// 字符串截取（解决含emoji表情问题）
export default function StrSlice(str, pStart, pEnd) {
  let result = ''
  let pIndex = 0
  let cIndex = 0
  while (1) {
    if (pIndex >= pEnd || cIndex >= str.length)
      break

    const point = str.codePointAt(cIndex)
    if (pIndex >= pStart)
      result += String.fromCodePoint(point)

    pIndex++
    cIndex += point > 0xFFFF ? 2 : 1
  }
  return result
}
