// rgb 转 hex
/**
 * @param {number} r red颜色值
 * @param {number} g green颜色值
 * @param {number} b blue颜色值
 * @return {string} 16进制颜色值
 */
export default function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
