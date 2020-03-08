import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
import Icon from './icon.mjs'
const defaultClass = `
d-flex
ai-c
fs-off-scale
fw-medium
uppercase
lh2
pr0
pl-1
c-p26
c-h3
c-a5
bg-a7
br-pill
transition-all
`

export default function GlobalNavLink (props) {
  props = props || {}
  let href = props.href || '#'
  let alt = props.alt || href
  let icon = props.icon
  let mergedClass = joinClasses(defaultClass, props.class, props.active ? 'active' : '')
  let target = props.target || '_self'
  let rel = target === '_blank' ? 'noopener' : ''
  let label = props.label || ''

  return html`
<a
  alt="${alt}"
  class="${mergedClass}"
  href="${href}"
  target="${target}"
  rel="${rel}"
>
  <${Icon}
    class="mr-2 f-p26"
    href="${icon}"
    style="width:0.888rem;height:0.777rem;"
  ><//>
  <span>
    ${label}
  </span>
</a>
  `
}
