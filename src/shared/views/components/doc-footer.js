module.exports = function DocFooter (meta) {
  meta = meta || {}
  var github = meta.github
  var nextDoc = meta.nextDoc
  var nextTitle = meta.nextTitle

  // Check for GitHub
  function Github () {
    if (github != undefined) {
      return `
<a href="${github}" target="_blank">Edit this page on GitHub</a>
  `
    } else {
      return ""
    }
  }

  // Check for Next
  function Next () {
    if (nextDoc != undefined && nextTitle != undefined) {
      return `
<h2>Next: <a href="${nextDoc}">${nextTitle} →</a></h2>
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
