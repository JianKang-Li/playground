const colorPick = document.querySelector('#colorPick')
const colorValue = document.querySelector('#colorValue')
colorPick.addEventListener('change', () => {
  colorValue.value = colorPick.value
})
