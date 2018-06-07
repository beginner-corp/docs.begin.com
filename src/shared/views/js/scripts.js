let fs = require('fs')
let read = fs.readFileSync

let menu = read(__dirname + '/_menu.js', 'utf8')
let prism = read(__dirname + '/_prism.js', 'utf8')
let ga = read(__dirname + '/_ga.js', 'utf8')

module.exports = function scripts () {
  return `<script>` + menu + prism + ga + `</script>`
}
