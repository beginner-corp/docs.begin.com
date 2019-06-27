import renderContent from '../util/render-content.mjs'
import store from '../data/store.mjs'
import Guide from '../containers/guide.mjs'
let props = store(window.__STATE__)
renderContent(Guide, props)
