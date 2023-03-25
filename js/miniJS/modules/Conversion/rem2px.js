// rem转px
/**
* @param {Number} rem rem值
* @return {Number} 对应px值
* 
**/
export default function rem2px(rem) {
  const docpx = getComputedStyle(document.documentElement)["font-size"]
  let px = rem * parseInt(docpx)
  return px
}