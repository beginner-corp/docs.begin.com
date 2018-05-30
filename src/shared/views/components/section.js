var classes = 'foo'

module.exports = function getSections(ToC, categoryIndex, docIndex) {
  ToC = ToC || {}
  categoryIndex = categoryIndex
  docIndex = docIndex

  // Loop through the doc's sections array, executing Section() to assemble the section list HTML
  let sectionList = []
  for (s = 0; s < ToC[categoryIndex].docs[docIndex].sections.length; s++) {
    sectionList = sectionList + Section(ToC, categoryIndex, docIndex, s)
  }

  // Assemble the leaf nodes into a list which we're done now I think?
  function Section(ToC, categoryIndex, docIndex, s) {
    let sectionAnchor = ToC[categoryIndex].docs[docIndex].sections[s].sectionAnchor
    let sectionName = ToC[categoryIndex].docs[docIndex].sections[s].sectionName
    return `
      <li class="${classes}">
        <a href="${sectionAnchor}"">${sectionName}</a>
      </li>
    `
  }

  return `
    <ul id="sections">${sectionList}</ul>
`
}
