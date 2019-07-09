import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
import Icon from './icon.mjs'
const defaultClass = 'd-block fw-book c-p8 c-h0 c-a4'

export default function SidebarDocLink (props) {
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
  let spanClass = joinClasses(
    `d-inline-flex ai-c pt-3 pr0 pb-3`,
    active
      ? ''
      : 'pl0'
  )

  return html`
<a ...${props} class="${mergedClass}" rel="${rel}">
  <span
    class="${spanClass}">
    ${active
        ? html`
      <span class="mr-4">
        <${Icon}
          href="left-arrow"
          class="f-p3"
          style="width:0.6111rem;height:0.666rem;"
        ><//>
      </span>
        `
      : ''
    }
    ${props.children}
  </span>
</a>
  `
}
