let arc = require('@architect/functions')

function route(req, res) {
  // console.log(JSON.stringify(req, null, 2))
  res({location: '/en/getting-started/introduction'})
}

exports.handler = arc.html.get(route)
