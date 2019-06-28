import { Component, html } from '../vendor/preact.mjs'
import store from '../data/store.mjs'
import Guide from '../pages/guide.mjs'

class GuideContainer extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.toggle = this.toggle.bind(this)
    this.disclose = this.disclose.bind(this)
    let meta = Object.assign({}, props.meta)
    let background = meta.background || ''
    let icon = meta.icon || ''
    let title = meta.docTitle || ''
    let toc = meta.sections || []
    // We only use props as initial values ( from hydration )
    // subsequent api responses replace the initial values from props
    this.state = {
      account: Object.assign({}, props.account),
      active: Object.assign({}, props.active),
      content: props.content,
      background,
      disclosed: false,
      icon,
      open: false,
      title,
      toc
    }
  }

  disclose (e) {
    e.preventDefault()
    this.setState({disclosed: !this.state.disclosed})
  }

  toggle (e) {
    e.preventDefault()
    this.setState({
      open: !this.state.open,
      disclosed: false
    })
  }

  componentDidMount () {
    // store.subscribe(this.update)
    this.setState(store(window.__STATE__))
  }

  update (state) {
    this.setState(state)
  }

  docsFilter (category) {
    return category
      ? category.catID !== 'guides'
      : false
  }

  render (props, state) {
    return html`
<${Guide}
  ...${state}
  disclose="${this.disclose}"
  toggle="${this.toggle}"
><//>
    `
  }
}

export default GuideContainer
