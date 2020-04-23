import { html } from '../vendor/preact.mjs'
const linkClasses = 'mb0 c-p3 c-h0 c-a0 fw-book'

export default function SidebarCategoryItem(props) {
    let active = props.active
    let title = props.title
    let documents = props.documents
    return html`
<li
  active="${active}"
  class="${linkClasses}"
>
  <h6
    class="pt-3 pb-3 fs-1 fw-medium c-p8 uppercase nowrap cu-pointer"
  >
    ${title}
  </h6>
  <ul class="o-hidden">
    ${documents}
  </ul>
</li>
  `
}
