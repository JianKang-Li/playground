(function () {
  "use strict";

  const style = document.createElement("style")
  style.innerHTML = `

  .lbtn {
    background-color: rgba(250, 250, 250, 0.8);
    width:32px;
    border:none;
    height:32px;
    border-radius: 50%;
    position: fixed;
    left: 1em;
    bottom: 6em;
    z-index: 9999;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .lbtn:focus {
    outline: none;
  }
`
  const buttons = document.createElement('div')
  buttons.className = 'lbtn'
  buttons.innerText = `up`
  buttons.setAttribute('id', 'ljk')
  buttons.setAttribute("contenteditable", false)

  const body = document.querySelector("body")

  body.appendChild(style)
  body.appendChild(buttons)

  const ljk = document.querySelector("#ljk")

  ljk.addEventListener("click", function () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    const main = document.querySelector('main')
    main.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  });
})();