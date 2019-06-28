import { html } from '../vendor/preact.mjs'
import LayoutSidebar from '../layout/layout-sidebar-guide.mjs'

export default function Guide (props) {
  props = props || {}
  let account = props.account || {}
  let active = props.active || {}
  let content = props.content || ''
  let background = props.background || ''
  let icon = props.icon || ''
  let meta = props.meta || {}
  let title = props.title || ''
  let open = props.open || false
  let toc = props.toc || {}
  let toggle = props.toggle || function () {}
  let disclose = props.disclose || function () {}
  let disclosed = props.disclosed || false
  let innerHTML = {
    __html: content
  }

  return html`
<${LayoutSidebar}
  account="${account}"
  active="${active}"
  background="${background}"
  disclose="${disclose}"
  disclosed="${disclosed}"
  icon="${icon}"
  meta="${meta}"
  open="${open}"
  title="${title}"
  toc="${toc}"
  toggle="${toggle}"
>
  <div class="d-flex fd-c">
    <div
      id="doc"
      class="fg-1 m-auto-lg max-w-60 pb2"
    >
      <div dangerouslySetInnerHTML="${innerHTML}"></div>
    </div>
  </div>
<//>
  `
}
