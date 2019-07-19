let test = require('tape')
let sha = require('../../../src/http/get-modules-000type-000module/_sha')

test('Set up env', t => {
  t.plan(1)
  t.ok(sha, 'sha loaded')
})

test('Get fingerprinted filename', t => {
  t.plan(2)
  let contents = new Buffer.from('Whale hello there!')
  let filename = sha('foo.mjs', contents)
  t.equals(filename, 'foo-c1b0bb49bc.mjs', 'Got correct filename back')
  filename = sha('foo.mjs', 'Whale hello there!')
  t.equals(filename, 'foo-c1b0bb49bc.mjs', 'Got correct filename back')
})

test('Get un-fingerprinted filename', t => {
  t.plan(4)
  let result = sha.remove('foo-c1b0bb49bc.mjs')
  t.equals(result, 'foo.mjs', 'Got correct filename back')
  // Test failures because method may sanitize user-requested filenames
  let fail = (filename) => {
    try {
      sha.remove(filename)
      t.fail(`Didn't fail`)
    }
    catch(e) {
      t.ok(e, `Failed on invalid filename: ${filename}`)
    }
  }
  fail('foo.mjs')
  fail('bar.js')
  fail('12345678901.mjs')
})
