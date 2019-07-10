import { html } from '../vendor/preact.mjs'
import Deprecated from '../ui/deprecated.mjs'
import LayoutSidebar from '../layout/layout-sidebar.mjs'

export default function Docs (props) {
  props = props || {}
  let account = props.account || {}
  let content = props.content || ''
  let deprecated = props.meta.deprecated || false
  let meta = props.meta || {}
  let docTitle = meta.docTitle || ''
  let active = props.active || {}
  let open = props.open || false
  let overflow = props.overflow || false
  let referTo = props.meta.referTo || ''
  let toc = props.toc.filter(category => category.catID !== 'guides' && category.catID !== 'static-guides') || {}
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
  disclose="${disclose}"
  disclosed="${disclosed}"
  meta="${meta}"
  open="${open}"
  overflow="${overflow}"
  toc="${toc}"
  toggle="${toggle}"
>
  <div class="d-flex fd-c">
    <div
      id="doc"
      class="fg-1 max-w-60 pb2"
    >
      <${Deprecated}
        deprecated="${deprecated}"
        referTo="${referTo}"
      ><//>
      <h1>
        ${docTitle}
      </h1>
      <div dangerouslySetInnerHTML="${innerHTML}"></div>
    </div>
  </div>
<//>
  `
}
