let fs = require('fs')
let read = fs.readFileSync
let ga = require('./_ga')
let menu = read(__dirname + '/_menu.js', 'utf8')
let prism = read(__dirname + '/_prism.js', 'utf8')

module.exports = function scripts () {
  return `<script>` + menu + prism + `</script>` + ga()
}
