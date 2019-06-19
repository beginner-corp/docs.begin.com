import { html } from '../vendor/preact.mjs'
import Layout from '../layout/layout.mjs'

export default function Guides (props) {
  props = props || {}
  let guides = (props.guides || [])
    .map(g => g.docs
      .map(d => html`
        <li>
          <a href="">
            <h3>
              ${d.docTitle}
            </h3>
            <p>
              ${d.description}
            </p>
          </a>
        </li>
        `
      )
    )

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
      p0
      bg-p14
      o-auto
    "
  >
    <ul
      class="
        d-grid
      "
    >
      ${guides}
    </ul>
  </section>
<//>
  `
}
