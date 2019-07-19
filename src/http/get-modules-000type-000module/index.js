const { promisify } = require('util')
const bundler = require('./_bundler')
const data = require('@architect/data')
const fingerprint = require('./_fingerprint')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const join = require('path').join
const replacer = require('./_replacer')
const sha = require('./_sha')
let staticAssets

/**
 * AWS env:
 * Entry module reqs:   bundle/sha (if necessary) and 302 to bundle
 * Bundle module reqs:  deliver bundle (or create bundle if not already found) with long-lived cache headers
 * Single module reqs:  serve fingerprinted versions with long-lived cache headers
 *
 * Local env:
 * Entry + module files: serve as is, with anti-caching headers
 * Do not bundle anything
 */
exports.handler = async function http (req) {
  let type = req.params.type
  let module = req.params.module
  let local = process.env.ARC_LOCAL || process.env.NODE_ENV === 'testing'
  let modulesPath = join(process.cwd(), 'node_modules', '@architect', 'views', 'modules')
  let requested = join(modulesPath, type, module)

  // Declare all local modules imported as classes (e.g. `new Bar('/modules/foo/bar.mjs')`) here:
  let globals = []

  try {
    let response = {
      type: 'text/javascript; charset=utf8'
    }
    let js
    // Be super careful disabling this, if you're using the remote db you can accidentally cache a development version of an asset!
    if (!local) {
      /**
       * Kicks off entry file bundling in staging and production
       */
      if (type === 'entry') {
        // Weed out bad requests
        if (!fs.existsSync(requested)) throw Error('file not found')

        // Check the cache first
        let key = module
        let cachedModule = await data.assets.get({key})

        // If warm, immediately forward to the bundle
        if (cachedModule) {
          return {
            location: `/modules/bundle/${cachedModule.hash}`,
            code: 302
          }
        }

        // Otherwise, warm the cache and forward to the bundle path
        else {
          staticAssets = fingerprint(globals)
          js = await bundler(requested)
          js = replacer(js, staticAssets)

          // Cache result for future requests
          cachedModule = {
            key: module,
            hash: sha(module, js),
            data: js,
            created: new Date().toISOString()
          }
          let maxSize = 399 * 1000 // Respect Dynamo's 400KB record limit
          if (js.length < maxSize) cachedModule = await data.assets.put(cachedModule)
          return {
            location: `/modules/bundle/${cachedModule.hash}`,
            code: 302
          }
        }
      }

      /**
       * Bundle request handler
       */
      else if (type === 'bundle') {
        requested = join(modulesPath, 'entry', sha.remove(module))
        if (fs.existsSync(requested)) {
          js = await data.assets.get({key:module})
          if (!js) {
            staticAssets = fingerprint(globals)
            js = await bundler(requested)
            js = replacer(js, staticAssets)
          }
          else js = js.data
        }
        else throw Error('file not found')
      }
      /**
       * Calls individual fingerprinted modules
       */
      else {
        requested = join(modulesPath, type, sha.remove(module))
        if (fs.existsSync(requested)) {
          js = await readFile(requested)
          if (js) {
            staticAssets = fingerprint(globals)
            js = replacer(js.toString(), staticAssets)
          }
          else throw Error('file not found')
        }
        else throw Error('file not found')
      }
      response.body = js
      response.cacheControl = 'max-age=315360000'
    }

    /**
     * Deliver unbundled, uncached, bare modules for local development
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
      body: `File not found`,
      cacheControl: 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
