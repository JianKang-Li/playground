const colorPick = document.querySelector('#colorPick')
const colorValue = document.querySelector('#colorValue')
colorPick.addEventListener('change', function () {
  colorValue.value = colorPick.value
})