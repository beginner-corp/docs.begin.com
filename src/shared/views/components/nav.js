var Category = require('./category')
var Doc = require('./doc')

module.exports = function Nav (state, ToC) {
  state = state || {}
  ToC = ToC || {}

  // Traverse the Table of Contents tree!
  // Loop through and snag all document categories specified in src/shared/docs/{language}/ToC.json
  function getCategories () {
    let categoryList = []
    for (let c = 0; c < ToC.length; c++) {
      categoryList = categoryList + Categories(c)
    }
    return categoryList
  }

  // Next, at each category node:
  //   - Category() → assemble the category container HTML, and
  //   - getDocs() → request its child docs
  function Categories (categoryIndex) {
    return Category(ToC, categoryIndex) + getDocs(categoryIndex)
  }

  // Now loop through each category's docs, executing Doc() to:
  //   - Check to see if the document is active, and
  //     - if so, assemble the doc section list HTML
  //   - assemble the doc link HTML
  function getDocs (categoryIndex) {
    let docsList = []
    for (let d = 0; d < ToC[categoryIndex].docs.length; d++) {
      docsList = docsList + Doc(state, ToC, categoryIndex, d)
    }
    return `
<div id="docs">
  ${docsList}
</div>
`
  }

  return getCategories()

  }
