import { html } from '../vendor/preact.mjs'
import Icon from './icon.mjs'

export default function MenuButton (props) {
  props = props || {}
  let click = props.onclick || function () {}
  let icon = props.open
    ? 'close'
    : 'menu'

  return html`
<a
  class="f-p1 bg-p0"
  href="/menu"
  onclick="${click}"
>
  <${Icon}
    href="${icon}"
    style="width:1rem;height:0.666rem;"
  ><//>
</a>
    `
}
