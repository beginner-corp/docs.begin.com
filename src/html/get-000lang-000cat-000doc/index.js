let arc = require('@architect/functions')
var render = require('@architect/shared/render')

function route(req, res) {
  (process.env.NODE_ENV == 'production') ? '' : console.log(req)
  let lang = req.params.lang
  let doc = req.params.doc
  let cat = req.params.cat
  let state = {doc, cat, lang}
  let {html, status} = render(state)
  res({
    status,
    html
  })
}

exports.handler = arc.html.get(route)
