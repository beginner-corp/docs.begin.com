import { html } from '../vendor/preact.mjs'

export default function Deprecated (props) {
  props = props || {}
  let deprecated = props.deprecated
  let referTo = props.referTo || '/'
  if (deprecated) return html`
<blockquote style="background-color: #25A78B; border-left-style: none;" class="c-p1 mt1">
  <p style="font-weight: 500;">
    This document is deprecated; please <a href="${referTo}" class="td-u c-p1 c-a1" style="color: #fff; font-weight: 500;">head on over here</a>
  </p>
</blockquote>
  `
}
