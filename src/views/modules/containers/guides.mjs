import { Component, html } from '../vendor/preact.mjs'
import store from '../data/store.mjs'
import Guides from '../pages/guides.mjs'

class GuidesContainer extends Component {
  constructor (props) {
    super(props)
    let toc = (props.toc || []).concat()
    let guides = toc.filter(category => category.catID === 'guides')
    this.update = this.update.bind(this)
    this.toggle = this.toggle.bind(this)
    this.disclose = this.disclose.bind(this)
    // We only use props as initial values ( from hydration )
    // subsequent api responses replace the initial values from props
    this.state = {
      account: Object.assign({}, props.account),
      disclosed: false,
      open: false,
      lang: props.lang,
      guides
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
  toggle="${this.toggle}"
  guides="${state.guides}"
><//>
    `
  }
}

export default GuidesContainer
