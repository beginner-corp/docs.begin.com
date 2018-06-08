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

  // Assemble the leaf nodes into a list which means we're done now I think?
  function Section(ToC, categoryIndex, docIndex, s) {
    let anchor = ToC[categoryIndex].docs[docIndex].sections[s].anchor
    let name = ToC[categoryIndex].docs[docIndex].sections[s].name
    return `
      <li class="pb-1 lh0">
        <a href="${anchor}" class="fw-book c-p20 c-h0 c-a0">${name}</a>
      </li>
    `
  }

  return `
    <ul id="sections" class="mt-1 pl0">${sectionList}</ul>
`
}
