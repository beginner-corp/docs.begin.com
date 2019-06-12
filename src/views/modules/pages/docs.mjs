import { html } from '../vendor/preact.mjs'
import Heading from '../ui/heading-xl.mjs'
import LayoutSidebar from '../layout/layout-sidebar.mjs'

export default function Docs (props) {
  props = props || {}
  let content = props.content || ''
  let meta = props.meta || {}
  let docTitle = meta.docTitle || ''
  let active = props.active || {}
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
  active="${active}"
  disclose="${disclose}"
  disclosed="${disclosed}"
  meta="${meta}"
  open="${open}"
  toc="${toc}"
  toggle="${toggle}"
>
  <div class="d-flex fd-c">
    <div
      id="doc"
      class="fg-1 m-auto max-w-60 pb2"
    >
      <${Heading}
        class="fs3 mb2 pt0-lg"
      >
        ${docTitle}
      <//>
      <div dangerouslySetInnerHTML="${innerHTML}"></div>
    </div>
  </div>
<//>
  `
}
