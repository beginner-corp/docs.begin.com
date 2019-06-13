import { html } from '../vendor/preact.mjs'
import PageHeader from '../ui/header-page.mjs'

export default function Layout (props) {
  props = props || {}

  return html`
<div class="vh-100 d-flex fd-c o-hidden">
  <${PageHeader} ...${props}><//>
  <h1
    class="
      fs2
      fs4-lg
      fw-book
      pt0
      pt2-lg
      pr0
      pr3-lg
      pb0
      pl3-lg
      pl0
      c-p8
    ">
    Learn more about Begin
  </h1>
  <hr class="d-none-lg b-b b-p18"/>
  <section
    class="
      fg-1
      p0
      bg-p14
      o-auto
    "
  >
    ${props.children}
  </section>
</div>
      `
}
