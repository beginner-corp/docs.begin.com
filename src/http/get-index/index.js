const imports = require('esm')(module)
let arc = require('@architect/functions')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Learn = imports('@architect/views/modules/pages/learn.mjs').default
const HTMLDocument = imports('@architect/views/modules/document/html.mjs').default

function route (req, res) {
  let account = req.session.account || {}
  if (process.env.NODE_ENV !== 'production') console.log(req)
  try {
    let body = HTMLDocument({
      title: 'Learn',
      description: 'Landing page for Begin learning content.',
      children: renderToString(
        html`
        <${Learn}
          account="${account}"
        ><//>
        `
      ),
      scripts: [
        '/modules/entry/learn.mjs'
      ],
      state: {
        account
      }
    })
    res({
      html: body
    })
  } catch (err) {
    console.error(err)
    res({
      html: '404, sorry!',
      status: 404
    })
  }
}

exports.handler = arc.http(route)
