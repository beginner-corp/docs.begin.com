let env = process.env.NODE_ENV

exports.handler = async function route() {
  if (env === 'production') {
    return {
      type: 'text/plain; charset=utf8',
      body:
`User-agent: *
Disallow: `
    }
  }
  else {
    return {
      type: 'text/plain; charset=utf8',
      body:
`User-agent: *
Disallow: /`
    }
  }
}
