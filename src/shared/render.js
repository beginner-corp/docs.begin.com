var fs = require('fs')
var read = fs.readFileSync
var exists = fs.existsSync
var join = require('path').join
var layout = require('./views/layout')

module.exports = function render (active) {

  // Since this is (theoretically) shared by all routes, check to see if the requested document is in a section, or if it's at the root
  function inSection (doc, section) {
    if (section !== 'undefined') {
      return join(__dirname, 'docs', 'en', section, active.doc)
    } else {
      return join(__dirname, 'docs', 'en', active.doc)
    }
  }

  // Defines the files needed to render a doc
  var meta_file = inSection(active.doc, active.section) + '-meta.json'
  var content_file = inSection(active.doc, active.section) + '-content.md'

  // Make sure each doc has the required meta and content files
  if (exists(meta_file) && exists(content_file)) {
    // Good to go
    var meta = read(meta_file).toString()
    var content = read(content_file).toString()
    return {html: layout(meta,content)}
  }
  else {
    // Return 404
    var redirectHome = '404, sorry!'
    return {html: redirectHome, status: 404}
  }
}
