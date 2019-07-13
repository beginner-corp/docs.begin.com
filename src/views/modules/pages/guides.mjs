import { html } from '../vendor/preact.mjs'
import staticAsset from '../util/static-asset.mjs'
import Layout from '../layout/layout.mjs'
import Link from '../ui/link.mjs'
const itemClass = `
  mb0
  bg-p1
  b
  b-p18
  br1
  shadow-card
  o-hidden
  transform-scale-hover
  transform-scale-active
  transition-transform
`
const frameworkItemClass = `
  mb0
  bg-p1
  b
  b-p18
  br1
  shadow-card
  o-hidden
  transform-scale-hover
  transform-scale-active
  transition-transform
`
export default function Guides (props) {
  props = props || {}
  let lang = props.lang || 'en'
  let cat = 'guides'
  let docs = props.toc.find(category => category.catID === cat)

  let guides = (docs.docs.filter(doc => !doc.type && !doc.hidden) || [])
  guides = guides.map(d => {
    let doc = d.docID
    let href = `/${lang}/${cat}/${doc}`
    let icon = staticAsset(`guides/${d.icon}`)
    let bgsmall = `backgrounds/${d.background.replace('.png', '-sm.png')}`
    let background = `background-image:url(${staticAsset(bgsmall)});`
    return html`
    <li
      class="${itemClass}"
    >
      <a
        class="guide-link h-100 d-flex fd-c fw-book"
        href="${href}"
      >
        <div
          class="
            d-flex
            fd-c
            jc-e
            pr-1
            pb0
            pl-1
            fw-book
            c-p1
            background-size-cover
            transition-transform
            transition-background-x
            h-gradient
            guides-item-bg-h
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
            <h3 class="fs1 fw-book">
              ${d.docTitle}
            </h3>
          </div>
        </div>
        <p
          class="
            pt-1
            pr-1
            pb0
            pl-1
            c-p8
          "
        >
          ${d.description}
        </p>
      </a>
    </li>
    `
  })
  let guidesSection = guides.length
    ? html`
      <h3 class="mb0 fs1 fw-book">
        Primary guides & example Begin apps
      </h3>

      <ul
        class="
          d-grid
          g-col-1
          g-col-3-lg
          grid-guides
          mb2
        "
      >
        ${guides}
      </ul>
    `
    : ''

  let frameworks = (docs.docs.filter(doc => doc.type === 'framework' && !doc.hidden) || [])
  frameworks = frameworks.map(d => {
    let doc = d.docID
    let href = `/${lang}/${cat}/${doc}`
    let icon = staticAsset(`guides/${d.icon}`)
    return html`
      <li
        class="${frameworkItemClass}"
      >
        <a
          class="
            h-100
            d-flex
            jc-c
            ai-c
            pt0
            pr1
            pb0
            pl1
            fw-book
          "
          href="${href}"
        >
          <img
            class="mr-2"
            src="${icon}"
            style="width:4.944rem;height:1.888;"
          />
        </a>
      </li>
    `
  })
  let frameworksSection = frameworks.length
    ? html`
    <h3 class="mb0 fs1 fw-book">
      Framework guides
    </h3>

    <ul
      class="
        d-grid-lg
        g-col-1
        g-col-4-lg
        g-auto-rows-4
        g-gap1
        m-auto
        mb3
      "
    >
      ${frameworks}
    </ul>
    `
    : ''

  return html`
<${Layout} ...${props}>
  <div class="h-100 d-flex fd-c fg-1 o-auto">
  <div class="
      p0
      pr4-lg
      pl4-lg
      c-p8
      fw-book
    "
  >
    <div
      class="max-w-48 m-auto"
    >
      <h1
        class="
          fs2
          fs3-lg
          fw-book
        "
      >
        Guides
      </h1>
    </div>
  </div>
  <hr class="b-b b-p18"/>
  <section
    class="
      fg-1
      pt0
      pt4-lg
      pr0
      pr4-lg
      pb0
      pb4-lg
      pl4-lg
      pl0
      bg-p14
      o-auto
    "
    >
      <div
        class="max-w-48 m-auto mb5"
      >

        ${guidesSection}

        ${frameworksSection}

        <div class="d-flex fw-w ai-c">
          <h3 class="mr-2 nowrap fs1 fw-book c-p8">
            Ready to dig deeper?
          </h3>
          <${Link}
            class="nowrap fs1"
            href="${lang + '/getting-started/introduction'}"
          >
            Check out our reference docs →
          <//>
        </div>

      </div>

    </section>
  </div>
<//>
  `
}
