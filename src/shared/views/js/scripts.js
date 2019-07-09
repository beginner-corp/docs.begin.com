let fs = require('fs')
let join = require('path').join
let read = fs.readFileSync
let ga = require('./_ga')
let prism = read(join(__dirname, '/_prism.js'), 'utf8')

module.exports = function scripts () {
  return `<script>${prism}</script>` + ga()
}
