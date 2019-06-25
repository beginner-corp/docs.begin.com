import { html } from '../vendor/preact.mjs'
import Layout from '../layout/layout.mjs'
import staticAsset from '../util/static-asset.mjs'
const itemClass = `
  mb0
  bg-p1
  br1
  b
  b-p18
  ta-c
  shadow-card
  o-hidden
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
              class="h-100 d-flex fd-c ta-l fw-book"
              href="${href}"
            >
              <div
                class="
                  fg-1
                  d-flex
                  fd-c
                  jc-e
                  pr-1
                  pb0
                  pl-1
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
                style="height:4rem;min-height:4rem;"
              >
                ${d.description}
              </p>
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
    <ul
      class="
        d-grid
        grid-guides
      "
    >
      ${guides}
    </ul>

    <h3>
      Framework specific static website guides
    </h3>

    <ul
      class="
        d-grid
        g-col-1
        g-col-3-lg
        g-auto-rows-4
        g-gap1
        m-auto
        mb5
      "
    >
    </ul>
  </section>
<//>
  `
}
