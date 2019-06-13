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

export default function Docs (props) {
  props = props || {}

  return html`
<${Layout}>
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
        href="/guides/quickstart"
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
            Here are some words that say things about quickstart.
          </p>
        </div>
      </a>
    </li>
    <li
      class="${itemClass + ' grid-2-1'}"
      style="
      "
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
        href="/guides"
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
            Here are some words that say things about guides.
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
        href="/en/getting-started/introduction"
      >
          <img
            alt="Documentation"
            class="d-block m-auto mb-2 ml-none-lg mr1-lg"
            src="${staticAsset('documentation.svg')}"
          />
          <div class="ta-l-lg mt0-lg">
            <h2
              class="
                fs2
                fw-book
              "
            >
              Documentation
            </h2>
            <p>
              Here are some words that say things about documentation.
            </p>
          </div>
      </a>
    </li>
  </ul>
<//>
  `
}
