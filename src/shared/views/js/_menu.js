(function () {
  var open = document.getElementById('menu-open')
  var close = document.getElementById('menu-close')
  var main = document.querySelector('.main')
  function toggle (e) {
    e.preventDefault()
    main.classList.toggle('slide-menu')
  }
  open.onclick = toggle
  close.onclick = toggle
}())