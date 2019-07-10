const imports = require('esm')(module)
let arc = require('@architect/functions')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Learn = imports('@architect/views/modules/pages/learn.mjs').default
const HTMLDocument = imports('@architect/views/modules/document/html.mjs').default

function route (req, res) {
  let account = req.session.account
  if (account) {
    account = {
      accountID: account.accountID,
      name: account.name,
      avatar: account.avatar,
      login: account.login,
      email: account.email,
      username: account.username
    }
  } else {
    account = {}
  }
  try {
    let body = HTMLDocument({
      description: 'Learn more about building applications with Begin',
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
