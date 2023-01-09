(function () {
  "use strict";
  let time = null
  const body = document.querySelector("body")
  body.addEventListener('contextmenu', () => {
    if (time) {
      if (Date.now() - time < 200) {
        window.close()
        time = null
      }
    } else {
      time = Date.now()
    }
  })
})(); 