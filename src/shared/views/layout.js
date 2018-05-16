var head = require('./head')
var md = require('marked')

module.exports = function layout (meta, content) {

  var meta = JSON.parse(meta)

  return `
<html>
  ${head(meta)}
  <body>
    ${md(content)}
  </body>
</html>
`
}