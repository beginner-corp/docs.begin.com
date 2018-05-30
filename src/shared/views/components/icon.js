var styles = ''
module.exports = function Icon (state) {
  state = state || {}
  var href = state.href || ''
  var classes = state.classes || ''
  var w = state.width
  var h = state.height
  classes = styles + ' ' + classes
  return `
<div
  class='${classes}'
  style='${w ? `width:${w};` : ''} ${h ? `height:${h};` : ''}'
>
  <svg>
    <use xlink:href='#${href}'/>
  </svg>
</div>
`
}
