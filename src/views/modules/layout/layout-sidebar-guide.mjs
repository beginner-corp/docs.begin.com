import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import staticAsset from '../util/static-asset.mjs'
import PageHeader from '../ui/header-page.mjs'
import Sidebar from '../ui/sidebar.mjs'

export default function GuideSidebarLayout (props) {
  props = props || {}
  let defaultMainClass = `
    p-absolute
    p-static-lg
    trbl
    min-w0
    fg-1
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
  let title = props.title || ''
  let background = `background-image:url(${staticAsset(props.background)});`
  let icon = staticAsset(props.icon)

  return html`
<div class="vh-100 d-flex fd-c o-hidden">
  <${PageHeader} ...${props}><//>
  <div
    class="
      d-flex
      fd-c
      jc-e
      pb0
      fw-book
      c-p1
      background-size-cover
    "
    style="${background}"
  >
    <div
      class="d-flex ai-c"
    >
      <img
        class="mr-2"
        src="${icon}"
        style="width:1.777rem;height:1.777rem;"
      />
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
        "
      >
        ${title}
      </h1>
    </div>
  </div>
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
