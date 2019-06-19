import renderContent from '../util/render-content.mjs'
import store from '../data/store.mjs'
import Guides from '../containers/guides.mjs'
let props = store(window.__STATE__)
renderContent(Guides, props)
