import { html } from '../vendor/preact.mjs'
import LayoutSidebar from '../layout/layout-sidebar.mjs'
import Header from '../ui/header.mjs'
import Heading from '../ui/heading-l.mjs'

export default function Docs (props) {
  props = props || {}
  let content = props.content || ''
  let state = props.state || {}
  let toc = props.toc || {}
  return html`
<${LayoutSidebar} state="${state}" toc="${toc}">
  <div class="d-flex fd-c h-100">
    <${Header}
      class='d-flex jc-b b-b b-p18'
    >
      <${Heading}>
        Documentation
      <//>
    <//>
    <div
      class="w-100 h-100 p0 p2-lg o-auto o-hidden-x"
    >
      <div
        class="m-auto mw-content pb0"
      >
        ${content}
      </div>
    </div>
  </div>
<//>
  `
}
