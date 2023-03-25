// svg代码转base64
/**
* @param {String} svg svg代码
* @return {String} base64格式图片代码
* 
**/
export default function svg2base(svg) {
  return 'data:image/svg+xml;base64,' + window.btoa(svg);
}