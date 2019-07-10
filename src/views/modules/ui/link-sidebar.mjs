import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'd-block pt-3 pr0 pb-3 pl0 fw-book c-p20 c-h0 c-a6 cu-pointer'

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
  ${props.children}
</a>
  `
}
