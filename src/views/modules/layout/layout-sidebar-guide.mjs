import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import staticAsset from '../util/static-asset.mjs'
import PageHeader from '../ui/header-page.mjs'
import Sidebar from '../ui/sidebar-guide.mjs'
import Footer from '../ui/footer.mjs'

export default function GuideSidebarLayout (props) {
  props = props || {}
  let meta = props.meta || {}
  let background = meta.background || ''
  let icon = meta.icon || ''
  let title = meta.docTitle || ''

  let defaultMainClass = `
    p-absolute
    p-static-lg
    trbl
    min-w0
    fg-1
    mt2-lg
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
  let asideClass = `
    p-absolute
    p-static-lg
    trbl
    fg-0
    o-auto
  `
  let backgroundImage = `
    background-image:url(${staticAsset(`backgrounds/${background}`)});
  `
  let iconImage = staticAsset(`guides/${icon}`)

  return html`
<div class="vh-100 d-flex fd-c o-hidden">
  <${PageHeader} ...${props}><//>
  <div
    class="
      d-flex
      fd-c
      jc-e
      p0
      pr4-lg
      pl4-lg
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
      <img
        class="mr-2"
        src="${iconImage}"
        style="width:1.777rem;height:1.777rem;"
      />
      <h1
        class="
          fs2
          fs3-lg
          fw-book
        "
      >
        ${title}
      </h1>
    </div>
  </div>
  <hr class="d-none-lg b-b b-p18"/>
  <div class="h-100 top-0 p-relative p-static-lg fg-1 d-flex-lg o-hidden">
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
