import { html } from '../vendor/preact.mjs'
import SidebarNav from './nav-sidebar.mjs'

export default function Sidebar (props) {
  props = props || {}

  return html`
<div class='d-flex fd-c h-100'>
  <div class="o-auto o-hidden-x fg-1">
    <${SidebarNav} ...${props}><//>
  </div>
</div>
  `
}
