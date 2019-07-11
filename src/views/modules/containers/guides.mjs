import { Component, html } from '../vendor/preact.mjs'
import store from '../data/store.mjs'
import Guides from '../pages/guides.mjs'

class GuidesContainer extends Component {
  constructor (props) {
    super(props)
    let toc = (props.toc || []).concat()
    this.update = this.update.bind(this)
    this.disclose = this.disclose.bind(this)
    // We only use props as initial values ( from hydration )
    // subsequent api responses replace the initial values from props
    this.state = {
      account: Object.assign({}, props.account),
      disclosed: false,
      open: false,
      lang: props.lang,
      toc
    }
  }

  disclose (e) {
    e.preventDefault()
    this.setState({disclosed: !this.state.disclosed})
  }

  componentDidMount () {
    store.subscribe(this.update)
    this.setState(store(window.__STATE__))
  }

  update (state) {
    this.setState(state)
  }

  render (props, state) {
    return html`
<${Guides}
  ...${state}
  disclose="${this.disclose}"
><//>
    `
  }
}

export default GuidesContainer
