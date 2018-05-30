var Icon = require('./icon.js')
var styles = 'cu-pointer p-2'
module.exports = function ButtonAction (state) {
  state = state || {}
  var id = state.id || ''
  var classes = state.classes || ''
  classes = styles + ' ' + classes
  return `
<button
  id="${id}"
  class="${classes}"
>
  ${Icon({
    classes: 'icon',
    href: 'close'
  })}
</button>
`
}
