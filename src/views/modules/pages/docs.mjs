import { html } from '../vendor/preact.mjs'
import Heading from '../ui/heading-xl.mjs'
import LayoutSidebar from '../layout/layout-sidebar.mjs'

export default function Docs (props) {
  props = props || {}
  let content = props.content || ''
  let meta = props.meta || {}
  let docTitle = meta.docTitle || ''
  let state = props.state || {}
  let toc = props.toc || {}
  let innerHTML = {
    __html: content
  }
  return html`
<${LayoutSidebar} meta="${meta}" state="${state}" toc="${toc}">
  <div class="d-flex fd-c h-100">
    <div
      class="w-100 h-100 p0 p2-lg o-auto o-hidden-x"
    >
      <div
        id="doc"
        class="m-auto mw-content pb0"
      >
        <${Heading}
          class="fs3 mb2 pt0-lg"
        >
          ${docTitle}
        <//>
        <div dangerouslySetInnerHTML="${innerHTML}"></div>
      </div>
    </div>
  </div>
<//>
  `
}
