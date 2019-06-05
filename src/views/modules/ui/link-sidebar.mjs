import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'd-block fw-book c-p3 c-h0 c-a6 bg-a8'

export default function SidebarLink (props) {
  let mergedClass = joinClasses(
    defaultClass,
    props.class,
    props.active
      ? 'active'
      : ''
    )
  let rel = props.target === '_blank'
    ? 'noopener'
    : ''

  return html`
<a ...${props} class="${mergedClass}" rel="${rel}">
  <span class="d-block pt-4 pr0 pb-4 pl0">
    ${props.children}
  </span>
</a>
  `
}
