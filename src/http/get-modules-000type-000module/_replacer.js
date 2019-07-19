const escodegen = require('escodegen')
const esprima = require('esprima')

/**
 * Preps bundled JS payloads to call fingerprinted modules
 * - Finds unbundled, root-relative local modules imported as classes
 * - Replaces {modulename} with {modulename}-{sha}, e.g.:
 *   - Before: `new Thing('/modules/{type}/{modulename}.mjs')`
 *   - After:  `new Thing('/modules/{type}/{modulename}-{sha}.mjs')`
 */
module.exports = function replacer(js, staticAssets) {
  if (!js || !staticAssets) throw ReferenceError('Cannot process JS')
  let ast = esprima.parseModule(js, {}, (node) => {
    if (node.type === 'NewExpression') {
      let call = node.arguments.findIndex(arg => arg.value && arg.value.includes('.mjs'))
      if (call !== -1) {
        let val = node.arguments[call].value
        let root = val.startsWith('/modules')
        if (root) {
          let file = val.replace('/modules/','')
          val = `/modules/${staticAssets[file]}`
        }
        node.arguments[call].value = val
      }
    }
  })
  js = escodegen.generate(ast, {format: {semicolons: false}})
  // Remove semicolons bc escodegen's semicolons: false setting doesn't what you'd hope it would
  js = js.replace(';\n', '\n')
  return js
}
