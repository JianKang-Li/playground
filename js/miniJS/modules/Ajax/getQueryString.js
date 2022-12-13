// 获取url某个参数
export default function getQueryString(url, name) {
  if (url.indexOf("?") != -1) {
    url = url.split("?")[1]
  }
  let U = new URLSearchParams(url);
  return U.get(name)
}