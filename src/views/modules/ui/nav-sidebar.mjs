import { html } from '../vendor/preact.mjs'
import SidebarLink from './link-sidebar.mjs'
const linkClasses = 'nav-link c-p3 c-h0 c-a0 fw-book'

export default function SidebarNav (props) {
  props = props || {}
  let active = props.active || {}
  let activeCategory = active.cat || ''
  let lang = active.lang || 'en'
  let toc = props.toc || {}
  let categories = toc.map(c => {
    let category = c.catID || ''
    let active = activeCategory === category
    let title = c.catTitle || ''
    let docs = c.docs
    let links = getLinks({category, docs, lang})
    let sections = links && links.length
      ? html`
    <ul>
      ${links}
    </ul>
    `
    : ''

    return html`
<li
  active="${active}"
  class="${linkClasses}"
>
  <h6
    class="fs-1 fw-medium c-p8 uppercase"
    onclick="${e => {
      console.log('OPEN')
    }}"
  >
    ${title}
  </h6>
  ${sections}
</li>
  `
  })
  return html`
<ul class="pt2 pr5 pb2 pl5 o-auto">
  ${categories}
</ul>
  `
}

function getLinks (props) {
  props = props || {}
  let category = props.category || ''
  let docs = props.docs || []
  let lang = props.lang || ''
  return docs.map(d => {
    let href = `/${lang}/${category}/${d.docID}`
    return html`
<li>
  <${SidebarLink}
    href="${href}"
  >
    ${d.docTitle}
  <//>
</li>
  `
  })
}
