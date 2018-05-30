var Head = require('./components/head')
var Header = require('./components/header')
var Sidebar = require('./components/sidebar')
var Symbols = require('./components/symbols')
var md = require('marked')

// var script = require('./_script')
// ${script('menu-toggle')}

module.exports = function Layout (state, meta, content, ToC) {
  state = state || {}
  meta = meta || {}
  ToC = ToC || {}

  return `
<!DOCTYPE html>
<html lang="en">
${Head(meta)}
<body>
${Symbols}
<div class="d-static h-100 o-hidden">
  <div class="d-flex fd-row fg-1">
    ${Header()}
  </div>
  <div class="d-flex fd-row fg-1">
    <aside class="sidebar fd-c fg-0 h-100">
      ${Sidebar(state, ToC)}
    </aside>
    <section class="main h-100 fd-c fg-1 pt0" id="doc">
      <h1 class="fs3">${meta.title}</h1>
      ${md(content)}
    </section>
  </div>
</div>
${state.scripts || ''}
</body>
</html>
`
}
