// rgb 转 hex
/**
* @param {Number} r red颜色值
* @param {Number} g green颜色值
* @param {Number} b blue颜色值
* @return {String} 16进制颜色值
**/
export default function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}