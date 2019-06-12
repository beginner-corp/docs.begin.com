import renderContent from '../util/render-content.mjs'
import store from '../data/store.mjs'
import Docs from '../containers/docs.mjs'
let props = store(window.__STATE__)
renderContent(Docs, props)
