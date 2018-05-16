let arc = require('@architect/functions')
var render = require('@architect/shared/render')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  let {html, status} = render(`${req.params.doc}`,`${req.params.section}`)
  res({
    status,
    html, 
  })
}

exports.handler = arc.html.get(route)
