export default function jsonp(url, option) {
  if (!url || !option) return;
  let script = document.createElement('script');
  url = /\?/.test(url) ? url + `&${option.name ? option.name : 'callback'}=` + option.callback : url + `?${option.name ? option.name : 'callback'}=` + option.callback
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}