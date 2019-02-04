module.exports = function DocFooter (state, ToC) {
  let {lang, cat, doc} = state

  // Get current position in tree
  let c = ToC.findIndex(c => c.catID === cat)
  let d = ToC[c].docs.findIndex(d => d.docID === doc)

  // If page is deprecated or hidden, bail early
  if (ToC[c].docs[d].deprecated || ToC[c].docs[d].hidden) {
    return ''
  }

  // Check for GitHub
  function Github() {
    let link = `https://github.com/smallwins/docs.begin.com/blob/master/src/shared/docs/${lang}/${cat}/${doc}.md`
    return `<a href="${link}" target="_blank">Edit this page on GitHub</a>`
  }

  // Check for Next
  function Next() {
    let nextDoc = (c,d) => `/${lang}/${ToC[c].catID}/${ToC[c].docs[d].docID}/`
    let nextTitle = (c,d) => ToC[c].docs[d].docTitle

    // Find the next viable doc's index (if any)
    let n = ToC[c].docs.findIndex((doc, docIndex) => {
      // Only look ahead
      if (docIndex <= d) return false
      // Skip deprecated or hidden
      if (doc.deprecated || doc.hidden) return false
      return true
    })

    if (n !== -1) {
      // Proceed to the next doc
      return `<h2>Next: <a href="${nextDoc(c,n)}">${nextTitle(c,n)} →</a></h2>`
    }
    else if (n === -1) {
      // No next doc exists, try the next category
      // P.S. Don't put a hidden or deprecated doc at index 0 pls
      if (ToC[c+1] && ToC[c+1].docs[0]) {
        return `<h2>Next: <a href="${nextDoc(c+1,0)}">${nextTitle(c+1,0)} →</a></h2>`
      }
      else return ''
    }
    else {
      return ''
    }
  }

  return `
  <hr id="footer-hr">
  ${Github()}
  ${Next()}
`
}
