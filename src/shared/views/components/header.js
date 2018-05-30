var Icon = require('./icon')
var Logo = require('./logo')
var styles = 'header d-flex ai-c fs1 fw-book fg-0 pl0 pl0-lg pr0 pr2-lg bg-p1'

module.exports = function Header (state) {
  state = state || {}
  var classes = state.classes || ''
  classes = styles + ' ' + classes
  return `
<header class="${classes}">
  <a
    id='menu-close'
    href="/"
    class="mr-1"
  >
    ${Icon({
      classes: 'icon',
      href: 'close'
    })}
  </a>
  ${Logo}
</header>
`
}
