/**
 * @param {string} url 请求地址
 * @param {object} option 请求参数包含请求回调函数自定义名和回调函数名
 *
 */
export default function jsonp(url, option) {
  if (!url || !option)
    return
  const script = document.createElement('script')
  url = /\?/.test(url) ? `${url}&${option.name ? option.name : 'callback'}=${option.callback}` : `${url}?${option.name ? option.name : 'callback'}=${option.callback}`
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}
