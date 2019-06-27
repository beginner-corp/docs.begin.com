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
const staticItemClass = `
  mb0
  pt0
  pr1
  pb0
  pl1
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
  let guides = (props.guides || [])
    .map(g => {
      let category = g.catID
      return g.docs
        .map(d => {
          let doc = d.docID
          let href = `/${lang}/${category}/${doc}`
          let icon = staticAsset(d.icon)
          let background = `background-image:url(${staticAsset(d.background)});`
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
    })

  let staticGuides = (props.staticGuides || [])
    .map(g => {
      let category = g.catID
      return g.docs
        .map(d => {
          let doc = d.docID
          let href = `/${lang}/${category}/${doc}`
          let icon = staticAsset(d.icon)
          return html`
          <li
            class="${staticItemClass}"
          >
            <a
              class="h-100 d-flex jc-c ai-c fw-book"
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
    })

  return html`
<${Layout} ...${props}>
  <div class="
      pt0
      pt5-lg
      pr0
      pr4-lg
      pb0
      pb4-lg
      pl4-lg
      pl0
      c-p8
      fw-book
    "
  >
    <div
      class="max-w-48 m-auto"
    >
      <h1
        class="
          mb-1
          fs2
          fs4-lg
          fw-book
        "
      >
        Begin Guides
      </h1>
      <p>
        While happily ignoring when being called small kitty warm kitty little balls of fur. Cats woo check cat door for ambush 10 times before coming in but spend all night ensuring people don't sleep sleep all day
      </p>
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

      <h3 class="mb0 fs1 fw-book">
        Static website guides
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
        ${staticGuides}
      </ul>

      <div class="d-flex fw-w ai-c">
        <h3 class="mr-2 nowrap fs1 fw-book c-p8">
          Want to learn more?
        </h3>
        <${Link}
          class="nowrap fs1"
          href="${lang + '/getting-started/introduction'}"
        >
          Check out our documentation →
        <//>
      </div>

    </div>

  </section>
<//>
  `
}
