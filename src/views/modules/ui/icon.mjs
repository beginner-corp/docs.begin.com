import { html } from '../vendor/preact.mjs'

export default function Icon (props) {
  return html`
<div
  class="${props.class}"
  style="${props.style}"
>
  <svg>
    <use xlink:href="${'#' + props.href}"></use>
  </svg>
</div>
  `
}
