import { html } from '../vendor/preact.mjs'
import SidebarLink from './link-sidebar.mjs'
const linkClasses = 'nav-link c-p3 c-h0 c-a0 fw-book'

export default function SidebarNav (props) {
  props = props || {}
  // let state = props.state || {}
  let toc = props.toc || {}
  let links = toc.map(c => html`
<${SidebarLink}
  class="${linkClasses}"
  href="#"
>
  ${c.catTitle}
<//>
  `)
  return html`
<div class="pb0 pt2">
  <nav>
    ${links}
  </nav>
</div>
  `
}
