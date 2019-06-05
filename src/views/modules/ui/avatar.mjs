import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'br-100 o-hidden of-c'

export default function Avatar (props) {
  let mergedClass = joinClasses(defaultClass, props.class)
  return html`
<img
  alt="Avatar"
  class="${mergedClass}"
  src="${props.src}"
  style="${props.style}"
/>
  `
}
