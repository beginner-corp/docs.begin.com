import { html } from '../vendor/preact.mjs'
import SidebarGuideLink from './link-sidebar-guide.mjs'
const linkClasses = 'c-p3 c-h0 c-a0 fw-book'

export default function SidebarGuideItem (props) {
  props = props || {}
  let active = props.active
  let href = props.href
  let title = props.title

  return html`
<li
  active="${active}"
  class="${linkClasses}"
>
  <${SidebarGuideLink}
    href="${href}"
    active="${active}"
  >
    ${title}
  <//>
</li>
  `
}
