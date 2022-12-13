// rem转px
export default function rem2px(rem) {
  const docpx = getComputedStyle(document.documentElement)["font-size"]
  let px = rem * parseInt(docpx)
  return px
}