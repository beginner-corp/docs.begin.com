var Icon = require('./icon')
var Logo = require('./logo')
var Nav = require('./nav')

module.exports = function Sidebar (state, ToC) {
  state = state || {}
  ToC = ToC || {}

  return `
<div class='d-flex fd-c h-100'>

  <header
    class="header d-flex ai-c fs1 fw-book fg-0 pl0 pl0-lg pr0 pr2-lg bg-p1"
  >
    <a
      id='menu-close'
      href="/"
      class="mr0"
    >
      ${Icon({
        classes: 'icon',
        href: 'close'
      })}
    </a>
    ${Logo()}
  </header>

  <div class="pt-2-lg o-scroll-y o-hidden-x fg-1">

    ${Nav(state, ToC)}

  </div>

</div>
`
}
