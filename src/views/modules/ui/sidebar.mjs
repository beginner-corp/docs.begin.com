import { html } from '../vendor/preact.mjs'
import SidebarLink from './link-sidebar.mjs'
import SidebarCategoryItem from './item-sidebar-category.mjs'

export default function Sidebar (props) {
  props = props || {}
  let categories = getCategories(props)

  return html`
<ul class="pt2 pr0 pr3-lg pb2 pl0 pl3-lg o-auto">
  ${categories}
</ul>
  `
}

function getCategories (props) {
  props = props || {}
  let active = props.active || {}
  let activeCategory = active.cat || ''
  let activeDoc = active.doc || ''
  let lang = active.lang || 'en'
  let toc = props.toc || {}
  return toc.map(c => {
    let category = c.catID || ''
    let active = activeCategory === category
    let title = c.catTitle || ''
    let docs = c.docs
    let links = getLinks({activeDoc, category, docs, lang})
    let sections = links && links.length
      ? html`
    <ul class="pt-4">
      ${links}
    </ul>
    `
    : ''

    return html`
<${SidebarCategoryItem}
  active="${active}"
  sections="${sections}"
  title="${title}"
><//>
    `
  })
}

function getLinks (props) {
  props = props || {}
  let category = props.category || ''
  let docs = props.docs || []
  let lang = props.lang || ''
  return docs.map(d => {
    let href = `/${lang}/${category}/${d.docID}`
    let active = props.activeDoc === d.docID
    return html`
<li>
  <${SidebarLink}
    href="${href}"
    active="${active}"
  >
    ${d.docTitle}
  <//>
</li>
  `
  })
}
