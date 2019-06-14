import { Component, html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import SidebarLink from './link-sidebar.mjs'
const linkClasses = 'c-p3 c-h0 c-a0 fw-book'

class SidebarDocItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.active || false
    }
  }

  render (props, state) {
    let active = props.active
    let href = props.href
    let title = props.title
    let sections = props.sections
    let docsClass = joinClass(
      'o-hidden',
      'menu-transition',
      'max-h-0',
      state.open
        ? 'max-h-infinity'
        : ''
    )
    return html`
<li
  active="${active}"
  class="${linkClasses}"
>
  <${SidebarLink}
    href="${href}"
    active="${active}"
  >
    ${title}
  <//>
  <ul class="${docsClass}">
    ${sections}
  </ul>
</li>
  `
  }
}

export default SidebarDocItem
