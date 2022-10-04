const resize = {
  // 指令的名称
  mounted(el, binding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = "",
      height = "";
    function isReize() {
      const style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        binding.value(); // 关键
      }
      width = style.width;
      height = style.height;
    }
    el.__vueSetInterval__ = setInterval(isReize, 500);
  },
  beforeUnmount(el) {
    clearInterval(el.__vueSetInterval__);
  },
}

export default resize