import { html } from '../vendor/preact.mjs'
import staticAsset from '../util/static-asset.mjs'
import Layout from '../layout/layout.mjs'
const itemClass = `
  mb0
  bg-p1
  br1
  b
  b-p18
  ta-c
  shadow-card
`

export default function Learn (props) {
  props = props || {}
  // FIXME: Pass in language from account & add language picker drop down
  let lang = props.lang || 'en'

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
        class="max-w-60 m-auto"
      >
        <h1
          class="
            fs2
            fs3-lg
            fw-book
          "
        >
          Learn more about building with Begin
        </h1>
      </div>
    </div>
    <hr class="b-b b-p18"/>
    <section
      class="
        fg-1
        p0
        pr4-lg
        pl4-lg
        bg-p14
      "
    >
      <ul
        class="
          max-w-60
          m-auto
          pt4-lg
          pb1
          d-static
          d-grid-lg
          grid-learn
        "
      >
        <li
          class="${itemClass + ' grid-1-1'}"
        >
          <a
            class="
              d-block
              w-100
              h-100
              pt2
              pr0
              pb2
              pl0
              fw-book
              c-p8
              cu-pointer
            "
            href="${'/' + lang + '/guides/quickstart'}"
          >
            <div
              class="m-auto item-learn-max-w-lg"
            >
              <img
                alt="Quickstart"
                class="d-block m-auto mb-2"
                src="${staticAsset('quickstart.svg')}"
              />
              <h2
                class="
                  fs2
                  fw-book
                "
              >
                Quickstart
              </h2>
              <p>
                Get started with Begin in no time flat!
              </p>
            </div>
          </a>
        </li>
        <li
          class="${itemClass + ' grid-2-1'}"
        >
          <a
            class="
              d-block
              w-100
              h-100
              pt2
              pr0
              pb2
              pl0
              fw-book
              c-p8
              cu-pointer
            "
            href="${'/' + lang + '/guides'}"
          >
            <div
              class="m-auto item-learn-max-w-lg"
            >
              <img
                alt="Guides"
                class="d-block m-auto mb-2"
                src="${staticAsset('guides.svg')}"
              />
              <h2
                class="
                  fs2
                  fw-book
                "
              >
                Guides
              </h2>
              <p>
                In-depth tutorials using example apps
              </p>
            </div>
          </a>
        </li>
        <li
          class="${itemClass + ' item-docs-h-lg grid-1_3-2'}"
        >
          <a
            class="
              d-flex
              fd-column
              fd-row-lg
              jc-s-lg
              w-100
              h-100
              pt2
              pr0
              pr1-lg
              pb2
              pl0
              pl1-lg
              fw-book
              c-p8
              cu-pointer
            "
            href="${'/' + lang + '/getting-started/introduction'}"
          >
              <img
                alt="Documentation"
                class="d-block m-auto mb-2 ml-none-lg mr1-lg mb-none-lg"
                src="${staticAsset('documentation.svg')}"
              />
              <div class="ta-l-lg mt2-lg">
                <h2
                  class="
                    fs2
                    fw-book
                  "
                >
                  Reference documentation
                </h2>
                <p>
                  Complete reference for Begin APIs, infrastructure, app architecture, and more
                </p>
              </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
<//>
  `
}
