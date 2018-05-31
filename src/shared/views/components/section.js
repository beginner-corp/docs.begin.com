module.exports = function getSections(ToC, categoryIndex, docIndex) {
  ToC = ToC || {}

  var categoryIndex = categoryIndex
  var docIndex = docIndex

  // Loop through the doc's sections array, executing Section() to assemble the section list HTML
  let sectionList = []
  let s = 0
  for (s = 0; s < ToC[categoryIndex].docs[docIndex].sections.length; s++) {
    sectionList = sectionList + Section(ToC, categoryIndex, docIndex, s)
  }

  // Assemble the leaf nodes into a list which we're done now I think?
  function Section(ToC, categoryIndex, docIndex, s) {
    let sectionAnchor = ToC[categoryIndex].docs[docIndex].sections[s].sectionAnchor
    let sectionName = ToC[categoryIndex].docs[docIndex].sections[s].sectionName
    return `
      <li class="pb-4 pl0">
        <a href="${sectionAnchor}" class="fw-book c-p20">${sectionName}</a>
      </li>
    `
  }

  return `
    <ul id="sections" class="pl0">${sectionList}</ul>
`
}
