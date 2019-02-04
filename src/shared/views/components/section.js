module.exports = function getSections(ToC, categoryIndex, docIndex) {
  ToC = ToC || {}

  var c = categoryIndex
  var d = docIndex

  // Loop through the doc's sections array, executing Section() to assemble the section list HTML
  let sectionList = []
  ToC[c].docs[d].sections.forEach(s => {
    sectionList.push(Section(s))
  })
  
  // Marked's slugger method
  //   https://github.com/markedjs/marked/blob/master/lib/marked.js
  function slug(value) {
    let slug = value
      .toLowerCase()
      .trim()
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-');
    return '#' + slug
  }

  // Assemble the leaf nodes into a list which means we're done now I think?
  function Section(section) {
    return `
      <li class="pb-1 lh0">
        <a
          class="fw-book c-p20 c-h0 c-a0 section-link"
          href="${slug(section)}"
          id="nav-section"
        >
          ${section}
        </a>
      </li>`
  }

  return `
    <ul id="sections" class="mt-1 pl0">${sectionList.join('')}</ul>
`
}
