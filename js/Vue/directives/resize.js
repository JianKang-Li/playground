const map = new WeakMap()
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target)
    if (handler) {
      handler()
    }
  }
})

export default {
  mounted(el, binding) {
    ob.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el) {
    ob.unobserve(el)
  },
  bind(el, binding) {
    ob.observe(el)
    map.set(el, binding.value)
  },
  unbind(el) {
    ob.unobserve(el)
  }
}