var Nav = require('./nav')

module.exports = function Sidebar (state, ToC) {
  state = state || {}
  ToC = ToC || {}

  return `
<div class='d-flex fd-c h-100'>

  <div class="o-scroll-y o-hidden-x fg-1">

    ${Nav(state, ToC)}

  </div>

</div>
`
}
