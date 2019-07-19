let test = require('tape')
let replacer = require('../../../src/http/get-modules-000type-000module/_replacer')

// let replacer
let staticAssets = {
  'vendor/preact.mjs': 'vendor/preact-cc74e9cfc6.mjs',
  'data/api-worker.mjs': 'data/api-worker-19c371a460.mjs'
}

test('Set up env', t => {
  t.plan(1)
  t.ok(replacer, 'Replacer loaded')
})

test('Ignore files without mjs imports', t => {
  t.plan(1)
  let js = `export default 'Hi!'`
  t.equals(replacer(js, staticAssets), js, 'Ignored file')
})

test(`Don't blow up if mjs not found in static`, t => {
  t.plan(1)
  let js = `import { html } from 'preact.mjs'\n` +
       `export default foo`
  t.equals(replacer(js, staticAssets), js, 'Did nothing')
})

test('Do not touch imports from relative paths', t => {
  t.plan(2)
  let js = `import { html } from './preact.mjs'\n` +
       `export default null`
  t.equals(replacer(js, staticAssets), js, 'Did nothing')

  js = `import { html } from '../vendor/preact.mjs'\n` +
       `export default null`
  t.equals(replacer(js, staticAssets), js, 'Did nothing')
})

test('Lookup import from instantiation: new Thing({file})', t => {
  t.plan(1)
  let js = `let worker = new Worker('/modules/data/api-worker.mjs')\n` +
           `export default worker`
  let result = `Worker('/modules/data/api-worker-19c371a460.mjs')`
  t.ok(replacer(js, staticAssets).includes(result), 'Successfully fingerprinted file')
})
