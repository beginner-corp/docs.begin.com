let arc = require('@architect/functions')

function route(req, res) {
  (process.env.NODE_ENV == 'production') ? '' : console.log(req)
  res({
    location: '/en/getting-started/introduction'
  })
}

exports.handler = arc.html.get(route)
