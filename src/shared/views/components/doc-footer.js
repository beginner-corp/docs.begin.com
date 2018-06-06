module.exports = function DocFooter (meta) {
  meta = meta || {}
  var github = meta.github
  var nextLink = meta.nextLink
  var nextTitle = meta.nextTitle

  // Check for GitHub
  function Github () {
    if (github != undefined) {
      return `
<a href="${github}">Edit this page on GitHub</a>
  `
    } else {
      return ""
    }
  }

  // Check for Next
  function Next () {
    if (nextLink != undefined && nextTitle != undefined) {
      return `
<h2>Next: <a href="${nextLink}">${nextTitle} →</a></h2>
  `
    } else {
      return ""
    }
  }

  return `
  <hr id="footer-hr">
  ${Github()}
  ${Next()}
`
}
