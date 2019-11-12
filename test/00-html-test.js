let test = require('tape')
let tiny = require('tiny-json-http')
let arc = require('@architect/architect')
process.env.PORT = 6666

test('env', t=> {
  t.plan(1)
  t.ok(arc.sandbox, 'arc.sandbox')
})

let end // saves a reference to be used later to shut down the sandbox
test('arc.sandbox.start', async t=> {
  t.plan(1)
  end = await arc.sandbox.start()
  t.ok(true, 'opened')
})

test('get /en/getting-started/introduction', t=> {
  t.plan(1)
  tiny.get({
    url: `http://localhost:6666/en/getting-started/introduction`
  },
  function win(err) {
    if (err) {
      t.fail(err)
    }
    else {
      t.ok(true, 'got result')
    }
  })
})

test('arc.sandbox.end', t=> {
  t.plan(1)
  end()
  t.ok(true, 'closed')
})
