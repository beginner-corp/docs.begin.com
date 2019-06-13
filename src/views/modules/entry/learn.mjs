import renderContent from '../util/render-content.mjs'
import store from '../data/store.mjs'
import Learn from '../containers/learn.mjs'
let props = store(window.__STATE__)
renderContent(Learn, props)
