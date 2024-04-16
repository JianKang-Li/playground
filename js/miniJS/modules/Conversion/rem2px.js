// rem转px
/**
 * @param {number} rem rem值
 * @return {number} 对应px值
 *
 */
export default function rem2px(rem) {
  const docpx = getComputedStyle(document.documentElement)['font-size']
  const px = rem * Number.parseInt(docpx)
  return px
}
