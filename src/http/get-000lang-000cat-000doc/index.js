let arc = require('@architect/functions')
let render = require('@architect/shared/render')
let path = require('path')
let forwards = require('./_forwards')

function route(req, res) {
  if (process.env.NODE_ENV !== 'production') console.log(req)
  let lang = req.params.lang
  let doc = req.params.doc
  let cat = req.params.cat
  let state = {doc, cat, lang}
  let _path = path.join('/', lang, cat, doc)

  // check to see if the requested document has been forwarded to a new path
  if (forwards[_path]) {
    res({
      location: forwards[_path]
    })
  }
  else {
    res(render(state))
  }
}

exports.handler = arc.http(route)
