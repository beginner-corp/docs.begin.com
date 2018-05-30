var fs = require('fs')
var read = fs.readFileSync
var exists = fs.existsSync
var join = require('path').join
var Layout = require('./views/layout')

module.exports = function render (state) {
  state = state || {}
  var doc = state.doc
  var cat = state.cat
  var lang = state.lang

  var ToC = JSON.parse(read(__dirname + '/docs/' + lang + '/ToC.json').toString())

  // Defines the files needed to render a doc
  var meta_file = join(__dirname, 'docs', lang, cat, doc) + '-meta.json'
  var content_file = join(__dirname, 'docs', lang, cat, doc) + '-content.md'

  // Make sure each doc has the required meta and content files
  if (exists(meta_file) && exists(content_file)) {
    // Good to go
    var meta = JSON.parse(read(meta_file).toString())
    var content = read(content_file).toString()
    return {html: Layout(state, meta, content, ToC)}
  } else {
    // Return 404
    var notFound = '404, sorry!'
    return {html: notFound, status: 404}
  }

}
