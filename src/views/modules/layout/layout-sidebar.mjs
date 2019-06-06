import { Component, html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import PageHeader from '../ui/header-page.mjs'
import Header from '../ui/header.mjs'
import Heading from '../ui/heading-xxl.mjs'
import Sidebar from '../ui/sidebar.mjs'

class SidebarLayout extends Component {
  constructor (props) {
    super()
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  toggle (e) {
    e && e.preventDefault()
    this.setState({open: !this.state.open})
  }

  render (props, state) {
    props = props || {}
    let defaultMainClass = 'main fg-1'
    let mergedMainClass = joinClass(
      defaultMainClass,
      state.open
        ? 'slide-menu'
        : ''
    )

    return html`
<div class="d-flex fd-c vh-100">
  <${PageHeader} ...${props} toggle="${this.toggle}"><//>
  <${Header}
    class='d-flex jc-b'
  >
    <${Heading}>
      Documentation
    <//>
  <//>
  <div class="p-relative d-flex-lg h-100 o-hidden">
    <aside class="sidebar p-absolute p-static-lg trbl fg-0">
      <${Sidebar} ...${props}><//>
    </aside>
    <section
      class="${mergedMainClass}"
    >
      ${props.children}
    </section>
  </div>
</div>
      `
  }
}

export default SidebarLayout
