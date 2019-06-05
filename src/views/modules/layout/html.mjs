import Head from './head.mjs'
import Symbols from './symbols.mjs'
import Script from './script.mjs'
import State from './state.mjs'

export default function HTML (props) {
  props = props || {}
  let scripts = props.scripts &&
    Array.isArray(props.scripts) &&
    props.scripts.map(src => Script({src}))
  scripts = scripts || ''
  let state = props.state &&
      State(props.state)
  return `
<!DOCTYPE html>
<html lang="en">
${Head()}
<body style="opacity: 0;">
  ${Symbols}
  <div id="begin-content" class="d-flex fd-c vh-100">
    ${props.children}
  </div>
  <div id="begin-modals"></div>
  ${state}
  ${scripts}
</body>
</html>
`
}
