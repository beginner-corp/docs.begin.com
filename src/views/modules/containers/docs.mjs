import { Component, html } from '../vendor/preact.mjs'
import store from '../data/store.mjs'
import Docs from '../pages/docs.mjs'

class DocsContainer extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.toggle = this.toggle.bind(this)
    this.disclose = this.disclose.bind(this)
    let toc = (props.toc || []).concat()
    // We only use props as initial values ( from hydration )
    // subsequent api responses replace the initial values from props
    this.state = {
      account: Object.assign({}, props.account),
      active: Object.assign({}, props.active),
      content: props.content,
      disclosed: false,
      meta: Object.assign({}, props.meta),
      open: false,
      overflow: false,
      toc
    }
  }

  disclose (e) {
    e.preventDefault()
    this.setState({disclosed: !this.state.disclosed})
  }

  toggle (e) {
    e && e.preventDefault()
    this.setState({
      open: !this.state.open,
      disclosed: false
    })
  }

  componentDidMount () {
    store.subscribe(this.update)
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
<${Docs}
  ...${state}
  disclose="${this.disclose}"
  toggle="${this.toggle}"
><//>
    `
  }
}

export default DocsContainer
