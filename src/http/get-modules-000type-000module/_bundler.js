const rollup = require('rollup')

module.exports = async function bundler(requested) {
  let bundle = await rollup.rollup({
    input: requested
  })
  let bundled = await bundle.generate({
    format: 'esm'
  })
  let js = bundled.output[0].code
  return js
}
