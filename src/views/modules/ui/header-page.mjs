import { Component, html } from '../vendor/preact.mjs'
import Lockup from '../ui/logo-lockup.mjs'
import GlobalNav from '../ui/nav-global.mjs'
import MenuButton from '../ui/button-menu.mjs'
import DisclosureLink from '../ui/link-disclose.mjs'

class PageHeader extends Component {
  constructor (props) {
    super()
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle (e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  render (props, state) {
    props = props || {}
    let account = props.account || {}
    let active = props.active || ''
    return html`
  <header class="p-relative d-flex ai-c jc-b p-1 bg-p25">
    <div class="d-flex ai-c w-100">
      <div
        class="d-none-lg mr-1"
        style="margin-top:-0.111rem;"
      >
        <${MenuButton}
          onclick="${props.toggle}"
        ><//>
      </div>
      <a class="mr4" href="/apps">
        <${Lockup}><//>
      </a>
      <${GlobalNav}
        account="${account}"
        active="${active}"
        open="${state.open}"
      ><//>
    </div>
    <div id="disclose-container">
      <${DisclosureLink}
        open="${state.open}"
        onclick="${this.toggle}"
      ><//>
    </div>
  </header>
    `
  }
}

export default PageHeader
