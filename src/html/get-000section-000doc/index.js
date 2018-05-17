let arc = require('@architect/functions')
var render = require('@architect/shared/render')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  let doc = req.params.doc
  let section = req.params.section
  let active = {doc, section}
  let {html, status} = render(active)
  res({
    status,
    html,
  })
}

exports.handler = arc.html.get(route)
