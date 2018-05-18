let arc = require('@architect/functions')

function route(req, res) {
  res({location:'/'})
}

exports.handler = arc.html.get(route)
