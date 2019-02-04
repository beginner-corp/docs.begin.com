var Category = require('./category')
var Doc = require('./doc')

module.exports = function Nav (state, ToC) {
  state = state || {}
  ToC = ToC || {}

  // Traverse the Table of Contents tree!
  // Loop through and render all document categories specified in src/shared/docs/{language}/ToC.json
  function getCategories () {
    let categoryList = []
    ToC.map((c,i) => {
      categoryList.push(renderCategory(i))
    })
    return categoryList.join('')
  }

  // At each category node:
  // - Category() → assemble the category container markup
  // - getDocs() → request its child docs
  function renderCategory(categoryIndex) {
    return Category(ToC, categoryIndex) + getDocs(categoryIndex)
  }

  // Loop through and render each category's docs
  // - If the document is active: render doc section list markup
  // - Assemble the final doc list markup
  function getDocs(categoryIndex) {
    let docsList = []
    ToC[categoryIndex].docs.map((d,i) => {
      docsList.push(Doc(state, ToC, categoryIndex, i))
    })
    return `
<div id="docs">
  ${docsList.join('')}
</div>
`
  }

  return getCategories()

  }
