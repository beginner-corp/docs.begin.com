import { html } from '../vendor/preact.mjs'
import SidebarLink from '../ui/link-sidebar.mjs'

export default function SidebarSectionItem (props) {
  props = props || {}
  let active = props.active
  let href = props.href
  let title = props.title

  return html`
<li class="ml0">
  <${SidebarLink}
    href="${href}"
    active="${active}"
  >
    ${title}
  <//>
</li>
  `
}
