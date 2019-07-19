const join = require('path').join
const fs = require('fs')
const sha = require('./_sha')

/**
 * Creates a static asset fingerprint inventory
 *   Effectively emulates `@static fingerprint true` against an array of modules
 *   Assumes input of ['{type}/{name}.mjs']
 */
module.exports = function fingerprint (files) {
  let staticAssets = {}
  files.forEach(file => {
    // Find the file
    let bits = file.split('/')
    let type = bits[0]
    let module = bits[1]
    let filepath = join(process.cwd(), 'node_modules', '@architect', 'views', 'modules', type, module)
    // Read the file
    let raw = fs.readFileSync(filepath)
    // Hash the file
    let hash = sha(file, raw)
    // Store it
    staticAssets[file] = hash
  })
  return staticAssets
}