import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'fw-book fs1 c-p8'

export default function HeadingLarge (props) {
  props = props || {}
  let mergedClass = joinClasses(defaultClass, props.class)
  return html`
<h1 ...${props} class="${mergedClass}"></h1>
  `
}
