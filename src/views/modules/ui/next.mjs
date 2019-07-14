import { html } from '../vendor/preact.mjs'
import Link from './link.mjs'

export default function Next (props) {
  props = props || {}
  let {lang, cat, doc} = props.active
  let {toc} = props

  // Get current position in tree
  let c = toc.findIndex(c => c.catID === cat)
  let d = toc[c].docs.findIndex(d => d.docID === doc)
  let nextDoc = (c,d) => `/${lang}/${toc[c].catID}/${toc[c].docs[d].docID}/`
  let nextTitle = (c,d) => toc[c].docs[d].docTitle

  // Find the next viable doc's index (if any)
  let n = toc[c].docs.findIndex((doc, docIndex) => {
    // Only look ahead
    if (docIndex <= d) return false
    // Skip deprecated or hidden
    if (doc.deprecated || doc.hidden) return false
    return true
  })

  if (n !== -1) {
    // Proceed to the next doc
    return html`
<div class="pt-3">
  <h2>
    Next: <a href="${nextDoc(c,n)}">${nextTitle(c,n)} →</a>
  </h2>
</div>
    `
  }
  else if (n === -1) {
    // No next doc exists, go to the next category
    // P.S. Don't put a hidden or deprecated doc at index 0 pls k thx
    if (toc[c+1] && toc[c+1].docs[0]) {
      return html`
<div class="pt-3">
  <h2>
    Next: <a href="${nextDoc(c+1,0)}">${nextTitle(c+1,0)} →</a>
  </h2>
</div>
      `
    }
    else return ''
  }
  else {
    return ''
  }
}
