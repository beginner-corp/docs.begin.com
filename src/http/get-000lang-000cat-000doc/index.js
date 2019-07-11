const imports = require('esm')(module)
const arc = require('@architect/functions')
const docsParser = require('@architect/shared/docs-parser')
const forwards = require('./_forwards')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Docs = imports('@architect/views/modules/pages/docs.mjs').default
const Guide = imports('@architect/views/modules/pages/guide.mjs').default
const HTMLDocument = imports('@architect/views/modules/document/html.mjs').default
const ThirdParty = require('@architect/views/scripts')

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
  let lang = req.params.lang || ''
  let doc = req.params.doc || ''
  let cat = req.params.cat || ''
  let docsProps = {doc, cat, lang}
  let path = `/${lang}/${cat}/${doc}`
  let isGuide = cat === 'guides'
  let entry = isGuide
    ? '/modules/entry/guide.mjs'
    : '/modules/entry/docs.mjs'

  // check to see if the requested document has been forwarded to a new path
  if (forwards[path]) {
    res({
      location: forwards[path]
    })
  } else {
    try {
      let props = docsParser(docsProps)
      let meta = props.meta || {}
      let content = props.content
      let active = props.active
      let toc = isGuide
        ? meta.sections
        : props.toc
      let Page = isGuide
        ? Guide
        : Docs
      let body = HTMLDocument({
        title: meta.docTitle,
        description: meta.description,
        children: renderToString(
          html`
          <${Page}
            account="${account}"
            active="${active}"
            content="${content}"
            meta="${meta}"
            toc="${toc}"
          ><//>
          `
        ),
        scripts: [
          entry
        ],
        state: {
          account,
          active,
          content,
          meta,
          toc
        },
        thirdparty: ThirdParty()
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
}

exports.handler = arc.http(route)
