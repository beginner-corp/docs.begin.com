import { html } from '../vendor/preact.mjs'
import SidebarLink from './link-sidebar.mjs'
import SidebarCategoryItem from './item-sidebar-category.mjs'

export default function Sidebar (props) {
  props = props || {}
  let categories = getCategories(props)

  return html`
<ul class="pt2 pr5 pb2 pl5 o-auto">
  ${categories}
</ul>
  `
}

function getCategories (props) {
  props = props || {}
  let active = props.active || {}
  let activeCategory = active.cat || ''
  let lang = active.lang || 'en'
  let toc = props.toc || {}
  return toc.map(c => {
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
