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

  function getDocMetadata(ToC) {
    // Find the active category by cat ID
    var c = ToC.findIndex(data => data.cat == cat)
    var activeCat = ToC[c].docs
    // Find the active doc by doc ID
    var d = activeCat.findIndex(data => data.doc == doc)
    var activeDoc = ToC[c].docs[d]
    // If the active doc is present in the filesystem but not present in the ToC, consider it unpublished and in-progress
    if (activeDoc == undefined) {
      return {title: 'Preview of ' + lang + '/' + cat + '/' + doc + '/'}
    } else {
      return activeDoc
    }
  }

  // Defines the file needed to render a doc
  var contentFile = join(__dirname, 'docs', lang, cat, doc) + '.md'

  // Make sure each doc has the required meta and content files
  if (exists(contentFile)) {
    // Good to go! Get the metadata, content, and send to Layout
    var meta = getDocMetadata(ToC)
    var content = read(contentFile).toString()
    return {html: Layout(state, meta, content, ToC)}
  } else {
    // Return 404
    var notFound = '404, sorry!'
    return {html: notFound, status: 404}
  }

}
