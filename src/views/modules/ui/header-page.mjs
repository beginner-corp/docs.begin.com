import { html } from '../vendor/preact.mjs'
import Lockup from '../ui/logo-lockup.mjs'
import GlobalNav from '../ui/nav-global.mjs'
import MenuButton from '../ui/button-menu.mjs'
import DisclosureLink from '../ui/link-disclose.mjs'

export default function PageHeader (props) {
  props = props || {}
  let account = props.account || {}
  let active = props.active || ''
  let toggle = props.toggle || function () {}
  let disclose = props.disclose || function () {}
  let disclosed = props.disclosed
  let open = props.open

  return html`
<header
  class="p-relative d-flex ai-c jc-b p-1 bg-p25"
  style="min-height:3.333rem;"
>
  <div class="d-flex ai-c w-100">
    <div
      class="d-none-lg mr-1"
      style="margin-top:-0.111rem;"
    >
      <${MenuButton}
        onclick="${toggle}"
      ><//>
    </div>
    <a class="mr4" href="/apps">
      <${Lockup}><//>
    </a>
   <${GlobalNav}
      account="${account}"
      active="${active}"
      open="${open}"
      disclosed="${disclosed}"
    ><//>
  </div>
  <div>
    <${DisclosureLink}
      open="${disclosed}"
      onclick="${disclose}"
    ><//>
  </div>
</header>
  `
}
