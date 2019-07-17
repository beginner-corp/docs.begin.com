const static = require('@architect/shared/static.json')

/**
 * Finds lines containing calls to other modules and ostensibly replaces them with fingerprinted names
 * - `import {Thing} from './{modulename}.mjs'`
 * - `import {Thing} from '../{type}/{modulename}.mjs'`
 * - `new Thing('/modules/{type}/{modulename}.mjs')`
 */
module.exports = function replacer(js, type) {
  let regex = /['"].*.mjs['"]/i
  let interested = regex.test(js)

  if (interested) {
    js = js.split('\n')
    // For loops are still fastest, or so they tell me
    for (let i=0; js.length > i; i++) {
      let module = js[i].match(regex) && js[i].match(regex)[0]
      if (module) {
        /**
         * Fully acknowledging we should probably just use a parser!
         * What we're doing here for now:
         * - Extract the module (anything between quotes with .mjs) from the line
         * - Extract the quotes
         * - Extract the first path part
         * - Add back in module type key if it's in the same directory
         * - Extract the type key and module key
         * - Query the static manifest for the fingerprinted value
         * - Bail if we don't know the file being requested
         * - Unwind the path if it's in the same directory
         * - Reassemble the module and line
         * - 🥵
         */
        js[i] = js[i].split(module)
        let quote = module[0]
        let raw = module.substr(1, module.length - 2)
        let firstChar = /\w/i
        let path = raw.slice(0, raw.match(firstChar).index)
        if (raw.startsWith('/modules/')) path = `/modules${path}`
        let sameDir = path === './'
        if (sameDir) raw = raw.split('./').join(`./${type}/`)
        let key = raw.split('/')
        key = `modules/${key[key.length - 2]}/${key[key.length - 1]}`
        let file = static[key]
        // End here if file isn't found
        if (!file) js[i] = js[i].join(module)
        else {
          if (sameDir) file = file.replace(`modules/${type}/`, '')
          else file = file.replace('modules/', '')
          file
          // Finally!
          js[i] = js[i].join(`${quote}${path}${file}${quote}`)
        }
      }
    }
    return js.join('\n')
  }
  return js
}
