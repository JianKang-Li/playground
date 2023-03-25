// 浏览器类型
/**
* @return {String} 浏览器类型
* 
**/
export default function browserType() {
  const explorer = window.navigator.userAgent.toLowerCase()
  // console.log(explorer);
  const isIE = !!window.ActiveXObject;
  const isIE6 = isIE && !window.XMLHttpRequest;
  const isIE8 = isIE && !!document.documentMode;
  const isIE7 = isIE && !isIE6 && !isIE8;
  if (isIE) {
    if (isIE6) {
      return "ie6";
    } else if (isIE8) {
      return "ie8";
    } else if (isIE7) {
      return "ie7";
    }
  }
  if (explorer.indexOf("msie") >= 0) {
    return 'IE'
  } else if (explorer.indexOf("firefox") >= 0) {
    return "Firefox"
  } else if (explorer.indexOf("edg") >= 0) {
    return 'Edge'
  } else if (explorer.indexOf("chrome") >= 0) {
    return "Chrome"
  } else if (explorer.indexOf("opera") >= 0 || explorer.indexOf("opr") > -1) {
    return "Opera"
  } else if (explorer.indexOf("safari") >= 0) {
    return "Safari"
  } else {
    return 'unknow'
  }
}