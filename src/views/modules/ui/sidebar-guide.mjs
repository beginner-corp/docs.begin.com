import { Component, html } from '../vendor/preact.mjs'
import getSlug from '../util/slug.mjs'
import SidebarGuideItem from './item-sidebar-guide.mjs'
const inWindow = typeof window !== 'undefined'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.hashChange = this.hashChange.bind(this)
    this.state = {
      active: ''
    }
  }

  componentDidMount () {
    if (inWindow) {
      window.onhashchange = this.hashChange
      this.setState({
        active: window.history.state
      })
    }
  }

  hashChange (e) {
    if (this.props.open) {
      this.props.toggle && this.props.toggle()
    }
    this.setState({
      active: window.history.state
    })
  }

  render (props, state) {
    let active = props.active || {}
    let category = active.cat || 'guides'
    let doc = active.doc || ''
    let lang = active.lang || 'en'
    let sections = props.toc || []
    let categories = sections.map(section => {
      let slug = getSlug(section)
      let href = `/${lang}/${category}/${doc}${slug}`
      let active = false

      return html`
<${SidebarGuideItem}
  active="${active}"
  href="${href}"
  title="${section}"
><//>
      `
    })

    return html`
<ul class="pt2 pr0 pr3-lg pb2 pl0 pl3-lg o-auto">
  <h6
    class="pt-3 pb-3 fs-1 fw-medium c-p8 uppercase nowrap cu-pointer"
  >
    Sections
  </h6>
  ${categories}
</ul>
  `
  }
}

export default Sidebar
