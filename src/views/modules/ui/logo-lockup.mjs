import { html } from '../vendor/preact.mjs'
import staticAsset from '../util/static-asset.mjs'

export default function LockupLogo (props) {
  return html`
<div class="logo d-flex ai-c">
  <img
    src="${staticAsset('begin-logo.svg')}"
    alt="begin logo"
    style="min-width:4.777rem;min-height:1.333rem;"
    width="86"
    height="24"
  />
</div>
  `
}
