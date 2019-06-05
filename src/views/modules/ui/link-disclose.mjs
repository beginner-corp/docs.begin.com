import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import Icon from './icon.mjs'
const defaultClass = 'd-block d-none-lg p-4 bg-p0 transition-rotate'

export default function DisclosureLink (props) {
  let mergedClass = joinClass(
    defaultClass,
    props.open
      ? 'rotate180'
      : ''
  )

  return html`
<a
  ...${props}
  href="#"
  class="${mergedClass}"
>
  <${Icon}
   class="f-p26"
   href="disclose"
   style="width:0.888rem;height:0.555rem;"
  ><//>
</a>
  `
}
