import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'fw-book c-p3 c-h0 c-a6'

export default function Link (props) {
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
<a ...${props} class="${mergedClass}" rel="${rel}"></a>
  `
}
