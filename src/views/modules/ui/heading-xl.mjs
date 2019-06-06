import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'fw-book fs3 c-p8'

export default function HeadingLarge (props) {
  props = props || {}
  let mergedClass = joinClasses(defaultClass, props.class)
  return html`
<h2 ...${props} class="${mergedClass}"></h2>
  `
}
