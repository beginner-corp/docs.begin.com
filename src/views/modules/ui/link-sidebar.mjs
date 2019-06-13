import { html } from '../vendor/preact.mjs'
import joinClasses from '../util/join-classes.mjs'
import Icon from './icon.mjs'
const defaultClass = 'd-block fw-book c-p20 c-h0 c-a4'

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
  <span class="d-inline-flex ai-c pt-4 pr0 pb-4 pl0">
    ${active
        ? html`
      <span style="margin-left:-5px;" class="mr-1">
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
