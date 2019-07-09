import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import PageHeader from '../ui/header-page.mjs'
import Sidebar from '../ui/sidebar.mjs'
import Footer from '../ui/footer.mjs'

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
    ${props.overflow
      ? 'o-auto-lg'
      : 'o-hidden-lg'
    }
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
    ${props.overflow
      ? 'o-auto-lg'
      : 'o-hidden-lg'
    }
  `

  return html`
<div class="vh-100 d-flex fd-c o-hidden">
  <${PageHeader} ...${props}><//>
  <div
    class="h-100 o-auto-lg"
    onscroll="${props.scroll}"
  >
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
    <div
      class="h-100 top-0 p-relative p-sticky-lg fg-1 d-flex-lg o-hidden"
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
</div>
  `
}
