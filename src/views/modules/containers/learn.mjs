import { Component, html } from '../vendor/preact.mjs'
import store from '../data/store.mjs'
import Learn from '../pages/learn.mjs'

class LearnContainer extends Component {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    // We only use props as initial values ( from hydration )
    // subsequent api responses replace the initial values from props
    this.state = {
      account: Object.assign({}, props.account)
    }
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
<${Learn}
  ...${state}
><//>
    `
  }
}

export default LearnContainer
