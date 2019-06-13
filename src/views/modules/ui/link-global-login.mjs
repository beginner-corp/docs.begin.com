import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
const defaultClass = `
pt-4
pr-1
pb-4
pl-1
mt-3
mt-none-lg
mr0
mb-2
mb-none-lg
ml-3
ml-none-lg
order1
order-initial-lg
fw-medium
fs-off-scale
ta-c
upper
br-pill
bg-p26
c-p25
c-h3
c-a5
bg-a7
transition-all
`
export default function GlobalLoginLink (props) {
  props = props || {}
  let mergedClass = joinClasses(defaultClass, props.class, props.active ? 'active' : '')
  return html`
<a
  href="/login"
  class="${mergedClass}"
  style="max-width: 6rem;"
>
  Login
</a>
  `
}
