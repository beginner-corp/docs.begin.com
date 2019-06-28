import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import PageHeader from '../ui/header-page.mjs'
import Sidebar from '../ui/sidebar.mjs'

export default function SidebarLayout (props) {
  props = props || {}
  let defaultMainClass = `
    p-absolute
    p-static-lg
    trbl
    min-w0
    fg-1
    mt0-lg
    p0
    bg-p1
    transition-transform
    transition-none-lg
    o-auto
  `
  let mergedMainClass = joinClass(
    defaultMainClass,
    props.open
      ? 'slide-menu'
      : ''
  )

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
    Documentation
  </h1>
  <hr class="d-none-lg b-b b-p18"/>
  <div class="p-relative p-sticky-lg top-0 fg-1 d-flex-lg o-hidden">
    <aside style="min-width:16.666rem;" class="p-absolute p-static-lg trbl fg-0 o-auto">
      <${Sidebar} ...${props}><//>
    </aside>
    <section
      class="${mergedMainClass}"
    >
      ${props.children}
    </section>
  </div>
</div>
      `
}
