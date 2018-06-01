var Icon = require('./icon')
var Logo = require('./logo')

module.exports = function HamburgerButton () {
  return `
<a
  id="menu-open"
  href="/"
  class=""
>
  <div class="bg-p1 mt0 ml-1 p-4 p-fixed p-static-lg">
    ${Icon({
      classes: 'icon',
      href: 'hamburger'
    })}
  </div>
</a>
`
}
