import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import PageHeader from '../ui/header-page.mjs'
import Sidebar from '../ui/sidebar.mjs'
import Footer from '../ui/footer.mjs'
import staticAsset from '../util/static-asset.mjs'

export default function SidebarLayout (props) {
  props = props || {}
  let sectionClass = `
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
    sectionClass,
    props.open
      ? 'slide-menu'
      : ''
  )
  let asideClass = `
    p-absolute
    p-static-lg
    trbl
    fg-0
    o-auto
  `
  let backgroundImage = `
    background-image:url(${staticAsset('item-gradient-green-blue.png')});
  `

  return html`
<div class="vh-100 d-flex fd-c o-hidden">
  <${PageHeader} ...${props}><//>
  <div
    class="
      d-flex
      fd-c
      jc-e
      p0
      pr3-lg
      pl3-lg
      fw-book
      c-p1
      background-size-cover
      background-repeat-none
    "
    style="${backgroundImage}"
  >
    <div
      class="d-flex ai-c"
    >
      <h1
        class="
          fs2
          fs3-lg
          fw-book
        "
      >
        Reference docs
      </h1>
    </div>
  </div>
  <hr class="d-none-lg b-b b-p18"/>
  <div
    class="h-100 top-0 p-relative p-static-lg fg-1 d-flex-lg o-hidden"
  >
    <aside
      style="min-width:16.666rem;max-width:19.999rem;"
      class="${asideClass}">
      <${Sidebar} ...${props}><//>
    </aside>
    <section
      class="${mergedMainClass}"
    >
      ${props.children}
      <${Footer} ...${props}><//>
    </section>
  </div>
</div>
  `
}
