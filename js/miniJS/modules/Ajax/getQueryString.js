// 获取url某个参数
/**
 * @param {string} url URL字符串
 * @param {string} name 需要获取的key
 * @return {string} 获取到的参数值
 */
export default function getQueryString(url, name) {
  if (url.includes('?'))
    url = url.split('?')[1]

  const U = new URLSearchParams(url)
  return U.get(name)
}
