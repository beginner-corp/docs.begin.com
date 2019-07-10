import { Component, html } from '../vendor/preact.mjs'
import Icon from './icon.mjs'

class MenuButton extends Component {
  constructor (props) {
    super()
    this.click = this.click.bind(this)
    this.state = {
      open: props.open
    }
  }

  click (e) {
    e.preventDefault()
    this.props.onclick && this.props.onclick(e)
    this.setState({open: !this.state.open})
  }

  render (props, state) {
    let icon = state.open
      ? 'close'
      : 'menu'
    return html`
<a
  class="f-p1 bg-p0"
  href="/menu"
  onclick="${this.click}"
>
  <${Icon}
    href="${icon}"
    style="width:1rem;height:0.666rem;"
  ><//>
</a>
    `
  }
}

export default MenuButton
