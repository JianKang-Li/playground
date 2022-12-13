//#region 简单响应式Solid.js
let _currentEffect;
export default function createEffect(effect) {
  _currentEffect = effect
  effect()
  _currentEffect = null
}

export default function createSignal(value) {
  const effects = new Set()
  function read() {
    // 依赖收集
    if (_currentEffect) effects.add(_currentEffect);
    return value
  }

  function write(newValue) {
    value = newValue
    // 触发依赖
    for (const effect of effects) {
      effect()
    }
  }
  return [read, write]
}