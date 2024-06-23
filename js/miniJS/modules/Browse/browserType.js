// 浏览器类型
/**
 * @return {string} 浏览器类型
 *
 */
export default function browserType() {
  const explorer = window.navigator.userAgent.toLowerCase()
  // console.log(explorer);
  const isIE = !!window.ActiveXObject
  const isIE6 = isIE && !window.XMLHttpRequest
  const isIE8 = isIE && !!document.documentMode
  const isIE7 = isIE && !isIE6 && !isIE8
  if (isIE) {
    if (isIE6)
      return 'ie6'
    else if (isIE8)
      return 'ie8'
    else if (isIE7)
      return 'ie7'
  }
  if (explorer.includes('msie'))
    return 'IE'
  else if (explorer.includes('firefox'))
    return 'Firefox'
  else if (explorer.includes('edg'))
    return 'Edge'
  else if (explorer.includes('chrome'))
    return 'Chrome'
  else if (explorer.includes('opera') || explorer.includes('opr'))
    return 'Opera'
  else if (explorer.includes('safari'))
    return 'Safari'
  else
    return 'unknow'
}
