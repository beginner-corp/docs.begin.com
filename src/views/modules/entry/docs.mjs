import renderContent from '../util/render-content.mjs'
import store from '../data/store.mjs'
import DomainsContainer from '../containers/domains.mjs'
let props = store(window.__STATE__)
renderContent(DomainsContainer, props)
