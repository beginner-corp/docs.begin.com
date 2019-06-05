const imports = require('esm')(module)
const arc = require('@architect/functions')
const content = require('@architect/shared/contents')
const path = require('path')
const forwards = require('./_forwards')
const renderToString = require('preact-render-to-string')
const { html } = imports('@architect/views/modules/vendor/preact.mjs')
const Docs = imports('@architect/views/modules/pages/docs.mjs').default
const HTMLDocument = imports('@architect/views/modules/layout/html.mjs').default

function route (req, res) {
  // if (process.env.NODE_ENV !== 'production') console.log(req)
  let lang = req.params.lang
  let doc = req.params.doc
  let cat = req.params.cat
  let state = {doc, cat, lang}
  let _path = path.join('/', lang, cat, doc)

  // check to see if the requested document has been forwarded to a new path
  if (forwards[_path]) {
    res({
      location: forwards[_path]
    })
  } else {
    try {
      let props = content(state)
      let meta = props.meta || {}
      let body = HTMLDocument({
        title: meta.docTitle,
        description: meta.description,
        children: renderToString(
          html`
          <${Docs}
            ...${props}
          ><//>
          `
        )
      })
      res({
        html: body
      })
    } catch (err) {
      res({
        html: '404, sorry!',
        status: 404
      })
    }
  }
}

exports.handler = arc.http(route)
