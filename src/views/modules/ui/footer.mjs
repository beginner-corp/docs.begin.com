import { html } from '../vendor/preact.mjs'
import staticAsset from '../util/static-asset.mjs'

export default function Footer (props) {
  props = props || {}
  let lang = props.lang || 'en'

  let guides = () => html`<div
    class="
      mb1
      bg-p1
      br1
      b
      b-p18
      ta-c
      shadow-card
      o-hidden
    "
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
      href="${'/' + lang + '/guides'}"
    >
      <img
        alt="Guides"
        class="m-auto mb-2 ml-none-lg mr0-lg"
        src="${staticAsset('guides.svg')}"
      />
      <div class="ta-l-lg mt0-lg">
        <h2
          class="
            fs2
            fw-book
          "
        >
          Guides
        </h2>
        <p>
          In-depth tutorials using example apps.
        </p>
      </div>
    </a>
  </div>`

  let isReference = props.active.cat !== 'guides'
  let reference = () => !isReference
    ? html`<div
  class="
    mb1
    bg-p1
    br1
    b
    b-p18
    ta-c
    shadow-card
    o-hidden
  "
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
      class="m-auto mb-2 ml-none-lg mr0-lg"
      src="${staticAsset('documentation.svg')}"
      style="max-width:6.166rem;"
    />
    <div class="ta-l-lg mt0-lg mb0-lg">
      <h2
        class="
          fs2
          fw-book
        "
      >
        Reference documentation
      </h2>
      <p>
        Complete reference docs for application architecture, APIs, and more.
      </p>
    </div>
  </a>
</div>`
  : ''

  let isQuickstart = props.active.cat !== 'guides' && props.active.doc !== 'quickstart'
  let quickstart = () => isQuickstart
    ? html`<div
  class="
    mb1
    bg-p1
    br1
    b
    b-p18
    ta-c
    shadow-card
    o-hidden
  "
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
    href="${'/' + lang + '/guides/quickstart'}"
  >
    <img
      alt="Quickstart"
      class="m-auto mb-2 ml-none-lg mr0-lg"
      src="${staticAsset('quickstart.svg')}"
    />
    <div class="ta-l-lg mt0-lg">
      <h2
        class="
          fs2
          fw-book
        "
      >
        Quickstart
      </h2>
      <p>
        Get up and running in no time flat!
      </p>
    </div>
  </a>
</div>`
  : ''

  return html`
<div
  class="
    pr0
    pb5
    pl0
  "
  style="max-width:44.444rem;"
 >
  <hr class="mt0 mb4 b-b b-p18"/>
  <h3
    class="
      mb1
      fs1
      fw-medium
      c-p8
    "
  >
    Learn more about building with Begin
  </h3>
  ${guides()}
  ${reference()}
  ${quickstart()}
</div>
  `
}
