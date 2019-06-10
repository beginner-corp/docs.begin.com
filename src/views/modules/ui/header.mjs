import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = 'd-flex ai-c fs1 fw-book fg-0 pl0 pl2-lg pr0 pr2-lg bg-p1'

export default function Header (props) {
  props = props || {}
  let mergedClass = joinClasses(
    defaultClass,
    props.class
  )
  return html`
<header ...${props} class=${mergedClass}></header>
  `
}
