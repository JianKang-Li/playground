// 获取url某个参数
/**
* @param {String} url URL字符串
* @param {String} name 需要获取的key
* @return {String} 获取到的参数值
**/
export default function getQueryString(url, name) {
  if (url.indexOf("?") != -1) {
    url = url.split("?")[1]
  }
  let U = new URLSearchParams(url);
  return U.get(name)
}