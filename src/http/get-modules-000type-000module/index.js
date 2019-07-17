const { promisify } = require('util')
const bundler = require('./_bundler')
const crypto = require('crypto')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const join = require('path').join
const fingerprint = require('@architect/shared/_fingerprint')
let fingerprintEnabled
// TODO: move index (and possibly cache) into more persistent store for faster forwards
let index = {}
let cache = {}

exports.handler = async function http (req) {
  let type = req.params.type
  let module = req.params.module
  if (fingerprintEnabled == undefined) fingerprintEnabled = fingerprint.enabled() // Ideally only check it once
  let local = process.env.ARC_LOCAL || process.env.NODE_ENV === 'testing'
  let requested = join(__dirname, 'node_modules', '@architect', 'views', 'modules', type, module)
  try {
    let response = {
      type: 'text/javascript; charset=utf8'
    }
    let js
    if (fingerprintEnabled && !local) {
      /**
       * Kicks off entry file bundling in staging and production
       */
      if (type === 'entry') {
        // If the cache is warm, immediately forward to the bundle
        if (index[module]) {
          return {
            location: `/modules/bundle/${index[module]}`,
            code: 302
          }
        }
        // Warm it up
        else {
          // Weed out bad requests
          if (!fs.existsSync(requested)) throw Error

          js = await bundler(requested)
          let dest = module.split('.mjs')
          let hash = crypto.createHash('sha1')
          hash.update(new Buffer.from(js))
          let sha = hash.digest('hex').substr(0,10)
          dest[dest.length - 2] = `${dest[dest.length - 2]}-${sha}`
          dest = dest.join('.mjs')

          // Index + cache result for future requests
          index[module] = dest
          cache[module] = js
          return {
            location: `/modules/bundle/${dest}`,
            code: 302
          }
        }
      }
      /**
       * Bundle request handler
       */
      else if (type === 'bundle') {
        module = module.split('.mjs')
        module[0] = module[0].slice(0, module[0].length - 11)
        module = module.join('.mjs')

        // Weed out bad requests
        if (module === '.mjs' || !module.includes('.mjs')) throw Error

        requested = join(process.cwd(), 'node_modules', '@architect', 'views', 'modules', 'entry', module)
        if (fs.existsSync(requested)) {
          js = cache[module] || await bundler(requested)
        }
        else throw Error
      }
      /**
       * Calls individual fingerprinted modules
       */
      else {
        // Caveat / FIXME(?): non-entry do not (yet) call other fingerprinted files
        // Prob just needs to be run through replacer (with some testing)
        let file = await readFile(requested)
        js = file.toString()
      }
      response.body = js
      response.cacheControl = 'max-age=315360000'
    }
    /**
     * Deliver unbundled modules
     */
    else {
      js = await readFile(requested)
      response.body = js.toString()
      response.cacheControl = 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
    return response
  } catch (err) {
    return {
      type: 'text/plain; charset=utf8',
      status: 404,
      body: `File not found`
    }
  }
}
