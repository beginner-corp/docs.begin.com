let arc = require('@architect/functions')

function route(req, res) {
  if (process.env.NODE_ENV !== 'production') console.log(req)
  res({
    status: 302,
    location: '/en/getting-started/introduction'
  })
}

exports.handler = arc.http(route)
