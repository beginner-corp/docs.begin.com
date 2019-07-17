const rollup = require('rollup')

module.exports = async function bundler(requested) {
  /**
   * Entry files are generally loaded via /_static
   * Bundling here in the endpoint should be considered backup / jic we need it
   */
  let bundle = await rollup.rollup({
    input: requested
  })
  let bundled = await bundle.generate({
    format: 'esm'
  })
  let js = bundled.output[0].code
  // eslint-disable-next-line
  let replacer = require('./_replacer')
  js = replacer(js, 'entry')
  return js
}