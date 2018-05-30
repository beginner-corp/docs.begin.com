var getSections = require('./section')
var classes = 'd-table nav-link fw-book fg-0 bg-a5 c-p8 c-h0 c-a0 ml0 mb-3'

module.exports = function Doc(state, ToC, categoryIndex, docIndex) {
  state = state || {}
  ToC = ToC || {}

  var categoryIndex = categoryIndex
  var docIndex = docIndex

  // Indexes identify
  var cat = ToC[categoryIndex].cat
  var doc = ToC[categoryIndex].docs[docIndex].doc

  // Determine if the requested doc is active, to highlight it and display its sections if so
  var active = cat == state.cat && doc == state.doc

  // Link data
  var href = '/' + state.lang + '/' + cat + '/' + doc + '/'
  var docTitle = ToC[categoryIndex].docs[docIndex].docTitle

  // If the document is active, append the active class to highlight it
  var styles = active
  ? classes + ' active'
  : classes

  // Loops through a doc's sections
  function Sections () {
    let sections = ToC[categoryIndex].docs[docIndex].sections
    // ... but if the doc is active because performance
    // and then check to make sure the doc actually has sections in the ToC tree
    // if so, execute getSections to assemble the doc section list HTML
    if (active && (sections != undefined) && (sections.length != 0)) {
      return getSections(ToC, categoryIndex, docIndex)
    } else {
      return ''
    }
  }

  return `
    <a
      alt="${docTitle}"
      class="${styles}"
      href="${href}"
    >
      <span class="d-block pt-5 pr-2 pb-5 pl-2">${docTitle}</span>
    </a>${Sections()}
`
}
