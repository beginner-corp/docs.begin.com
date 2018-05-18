var fs = require('fs')
var read = fs.readFileSync
var exists = fs.existsSync
var join = require('path').join
var layout = require('./views/layout')

module.exports = function render (active) {

  var doc = active.doc
  var section = active.section
  var lang = active.lang

  // This is (theoretically) shared by all routes
  // Check to see if the requested document is in a section, or if it's at the root.
  // @todo If someone is requesting a section page (i.e. doc is undefined) forward to home

  function inSection (doc, section) {

    if (section !== 'undefined') {
      return join(__dirname, 'docs', lang, section, doc)
    } else {
      return join(__dirname, 'docs', lang, doc)
    }
  }

  // Defines the files needed to render a doc
  var meta_file = inSection(doc, section) + '-meta.json'
  var content_file = inSection(doc, section) + '-content.md'

  // Make sure each doc has the required meta and content files
  if (exists(meta_file) && exists(content_file)) {
    // Good to go
    var meta = read(meta_file).toString()
    var content = read(content_file).toString()
    return {html: layout(meta,content)}
  } else {
    // Return 404
    var redirectHome = '404, sorry!'
    return {html: redirectHome, status: 404}
  }
}
