import { html } from '../vendor/preact.mjs'
import SidebarLink from './link-sidebar.mjs'
import SidebarCategoryItem from './item-sidebar-category.mjs'
import SidebarDocItem from './item-sidebar-doc.mjs'

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
  let lang = active.lang || 'en'
  let toc = props.toc || {}
  // Don't show guides
  let categories = toc.filter(c => c.catID !== 'guides')
  return categories.map(c => {
    let category = c.catID || ''
    let active = activeCategory === category
    let title = c.catTitle || ''
    let docs = c.docs
    let documents = getDocs({active: props.active, category, docs, lang})
    return html`
<${SidebarCategoryItem}
  active="${active}"
  documents="${documents}"
  title="${title}"
><//>
    `
  })
}

function getDocs (props) {
  props = props || {}
  let category = props.category || ''
  let docs = props.docs || []
  let lang = props.lang || ''
  return docs.map(d => {
    let doc = d.docID
    let href = `/${lang}/${category}/${doc}`
    let active = props.active.doc === doc
    let sections = (d.sections || []).map(s => {
      return html`
        <li class="ml0">
          <${SidebarLink}
            href="${href}"
          >
            ${s}
          <//>
        </li>
      `
    })

    return html`
<${SidebarDocItem}
    active="${active}"
    href="${href}"
    sections="${sections}"
    title="${d.docTitle}"
><//>
  `
  })
}