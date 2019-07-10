import { html } from '../vendor/preact.mjs'
import SidebarGuideLink from './link-sidebar-guide.mjs'

export default function SidebarGuideItem (props) {
  props = props || {}
  let active = props.active
  let href = props.href
  let title = props.title

  return html`
<li>
  <${SidebarGuideLink}
    href="${href}"
    active="${active}"
  >
    ${title}
  <//>
</li>
  `
}
