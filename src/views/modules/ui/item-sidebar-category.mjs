import { Component, html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
const linkClasses = 'mb3 c-p3 c-h0 c-a0 fw-book'

class SidebarCategoryItem extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: props.active || false
    }
  }

  toggle (e) {
    e.preventDefault()
    if (!this.props.active) {
      this.setState({
        open: !this.state.open
      })
    }
  }

  render (props, state) {
    let active = props.active
    let title = props.title
    let documents = props.documents
    let documentsClass = joinClass(
      'pt-4',
      'o-hidden',
      'menu-transition',
      'max-h-0',
      state.open
        ? 'max-h-infinity'
        : ''
    )
    return html`
<li
  active="${active}"
  class="${linkClasses}"
>
  <h6
    class="fs-1 fw-medium c-p8 uppercase nowrap cu-pointer"
    onclick="${this.toggle}"
  >
    ${title}
  </h6>
  <ul class="${documentsClass}">
    ${documents}
  </ul>
</li>
  `
  }
}

export default SidebarCategoryItem
