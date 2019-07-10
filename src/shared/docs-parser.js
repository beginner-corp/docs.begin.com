const fs = require('fs')
const read = fs.readFileSync
const join = require('path').join
const md = require('marked')

module.exports = function contents (active) {
  active = active || {}
  let doc = active.doc
  let cat = active.cat
  let lang = active.lang
  let path = (doc && cat && lang)
    ? join(__dirname, '/docs/', lang, '/ToC.json')
    : ''
  let toc = JSON.parse(read(path).toString())
  let meta = getDocMetadata(toc, lang, cat, doc)
  // Defines the file needed to render a doc
  let contentFile = join(__dirname, 'docs', lang, cat, doc) + '.md'
  // Keep active docs dirs clean
  //   Deprecated docs live on in {lang}/_deprecated/
  if (meta.deprecated) {
    contentFile = join(__dirname, 'docs', lang, '_deprecated', doc) + '.md'
  }
  let content = md(read(contentFile).toString())
  return {
    content,
    meta,
    active,
    toc
  }
}

function getDocMetadata (toc, lang, cat, doc) {
  // Find the active category by cat ID
  let c = toc.findIndex(c => c.catID === cat)
  let activeCat = toc[c].docs
  // Find the active doc by doc ID
  let d = activeCat.findIndex(d => d.docID === doc)
  let activeDoc = toc[c].docs[d]
  // Active doc may be present in the filesystem but not present in the ToC
  // If so, consider it unpublished / WIP
  if (activeDoc === undefined) {
    return {
      title: `Preview of ${lang}/${cat}/${doc}/`
    }
  } else {
    return activeDoc
  }
}
