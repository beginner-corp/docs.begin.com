const imports = require('esm')(module)
const arc = require('@architect/functions')
const docsParser = require('@architect/shared/docs-parser')
const path = require('path')
const forwards = require('./_forwards')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Docs = imports('@architect/views/modules/pages/docs.mjs').default
const HTMLDocument = imports('@architect/views/modules/document/html.mjs').default

function route (req, res) {
  // if (process.env.NODE_ENV !== 'production') console.log(req)
  let account = req.session.account
  let lang = req.params.lang
  let doc = req.params.doc
  let cat = req.params.cat
  let docsProps = {doc, cat, lang}
  let _path = path.join('/', lang, cat, doc)

  // check to see if the requested document has been forwarded to a new path
  if (forwards[_path]) {
    res({
      location: forwards[_path]
    })
  } else {
    try {
      let props = docsParser(docsProps)
      let meta = props.meta || {}
      let content = props.content
      let active = props.active
      let toc = props.toc
      let body = HTMLDocument({
        title: meta.docTitle,
        description: meta.description,
        children: renderToString(
          html`
          <${Docs}
            account="${account}"
            active="${active}"
            content="${content}"
            meta="${meta}"
            toc="${toc}"
          ><//>
          `
        ),
        scripts: [
          '/modules/entry/docs.mjs'
        ],
        state: {
          active,
          content,
          meta,
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
}

exports.handler = arc.http(route)
