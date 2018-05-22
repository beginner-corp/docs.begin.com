var fs = require('fs')
var read = fs.readFileSync
var exists = fs.existsSync
var join = require('path').join
var layout = require('./views/layout')

module.exports = function render (active) {

  var doc = active.doc
  var cat = active.cat
  var lang = active.lang

  // Defines the files needed to render a doc
  var meta_file = join(__dirname, 'docs', lang, cat, doc) + '-meta.json'
  var content_file = join(__dirname, 'docs', lang, cat, doc) + '-content.md'

  // Make sure each doc has the required meta and content files
  if (exists(meta_file) && exists(content_file)) {
    // Good to go
    var meta = read(meta_file).toString()
    var content = read(content_file).toString()
    return {html: layout(meta,content)}
  } else {
    // Return 404
    var notFound = '404, sorry!'
    return {html: notFound, status: 404}
  }

}
