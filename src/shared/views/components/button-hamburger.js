var Icon = require('./icon')
module.exports = function HamburgerButton () {
  return `
<a
  id="menu-open"
  href="/"
  class="mr-1"
>
  ${Icon({
    classes: 'icon',
    href: 'hamburger'
  })}
</a>
`
}
