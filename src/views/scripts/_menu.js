(function () {
  var open = document.getElementById('menu-open')
  var close = document.getElementById('menu-close')
  var main = document.querySelector('.main')
  function toggle (e) {
    e.preventDefault()
    main.classList.toggle('slide-menu')
  }

  function navSectionToggle() {
    main.classList.toggle('slide-menu')
  }
  function navSections (links) {
    for (i=0; links.length > i; i++) {
      links[i].addEventListener('click', navSectionToggle, false)
    }
  }
  navSections(document.querySelectorAll('#nav-section'))

  open.onclick = toggle
  close.onclick = toggle
}())
