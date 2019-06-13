import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'd-block fw-book c-p20 c-h0 c-a6'

export default function SidebarLink (props) {
  props = props || {}
  let active = props.active
  let mergedClass = joinClasses(
    defaultClass,
    props.class,
    active
      ? 'active'
      : ''
    )
  let rel = props.target === '_blank'
    ? 'noopener'
    : ''

  return html`
<a ...${props} class="${mergedClass}" rel="${rel}">
  <span class="d-block pt-4 pr0 pb-4 pl0">
    ${active
        ? html`
      <span style="margin-left:-5px;" class="mr-1">
        →
      </span>
        `
      : ''
    }
    ${props.children}
  </span>
</a>
  `
}
