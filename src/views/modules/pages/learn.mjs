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
`

export default function Docs (props) {
  props = props || {}

  return html`
<${Layout}>
  <ul
    class="
      m-auto
      d-static
      d-grid-lg
    "
    style="
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 4.111rem;
      grid-auto-rows: 22.222rem;
    "
  >
    <li
      class="${itemClass}"
      style="
        grid-column: 1;
        grid-row: 1;
      "
    >
      <a
        class="
          d-block
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
        <img
          alt="Quickstart"
          class="d-block m-auto mb-2"
          src="${staticAsset('quickstart.svg')}"
          style="min-width:6.388rem;min-height:6.333rem;"
          width="115"
          height="114"
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
      </a>
    </li>
    <li
      class="${itemClass}"
      style="
        grid-column: 2;
        grid-row: 1;
      "
    >
      <a
        class="
          d-block
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
        <img
          alt="Guides"
          class="d-block m-auto mb-2"
          src="${staticAsset('guides.svg')}"
          style="min-width:6.388rem;min-height:6.333rem;"
          width="115"
          height="114"
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
      </a>
    </li>
    <li
      class="${itemClass}"
      style="
        grid-column: 1 / 3;
        grid-row: 2;
      "
    >
      <a
        class="
          d-block
          pt2
          pr0
          pb2
          pl0
          fw-book
          c-p8
          cu-pointer
        "
        href="/en/getting-started/introduction"
      >
        <img
          alt="Documentation"
          class="d-block m-auto mb-2"
          src="${staticAsset('documentation.svg')}"
          style="min-width:6.388rem;min-height:6.333rem;"
          width="115"
          height="114"
        />
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
      </a>
    </li>
  </ul>
<//>
  `
}
