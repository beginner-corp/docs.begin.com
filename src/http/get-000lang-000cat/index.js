const imports = require('esm')(module)
const fs = require('fs')
const path = require('path')
const arc = require('@architect/functions')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Guides = imports('@architect/views/modules/pages/guides.mjs').default
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
  let lang = req.params.lang
  let file = fs.readFileSync(path.join(__dirname, 'node_modules', '@architect', 'shared', 'docs', lang, 'ToC.json'))

  try {
    let toc = JSON.parse(file)
    let body = HTMLDocument({
      title: 'Guides',
      description: 'Begin guides',
      children: renderToString(
        html`
        <${Guides}
          account="${account}"
          toc="${toc}"
        ><//>
        `
      ),
      scripts: [
        '/modules/entry/guides.mjs'
      ],
      state: {
        account,
        toc
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
