import { Component, html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import PageHeader from '../ui/header-page.mjs'
import Header from '../ui/header.mjs'
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
    console.log('YOLO')
    this.setState({open: !this.state.open})
  }

  render (props, state) {
    props = props || {}
    let defaultMainClass = 'main fg-1 bg-p1'
    let mergedMainClass = joinClass(
      defaultMainClass,
      state.open
        ? 'slide-menu'
        : ''
    )

    return html`
<div class="d-flex fd-c vh-100">
  <${PageHeader} ...${props} toggle="${this.toggle}"><//>
  <div class="p-relative h-100 o-hidden">
    <${Header}
      class='d-flex jc-b mt1 mb1 mt5-lg mb3-lg'
    >
      <h1
        class="fs2 fs5-lg fw-book c-p8"
      >
        Documentation
      </h1>
    <//>
    <div class="d-flex-lg">
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
</div>
      `
  }
}

export default SidebarLayout
