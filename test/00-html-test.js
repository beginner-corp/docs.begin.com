var test = require('tape')
var tiny = require('tiny-json-http')
var sandbox = require('@architect/workflows').sandbox

test('env', t=> {
  t.plan(1)
  t.ok(sandbox, 'sandbox')
})

let end
test('sandbox.start', t=> {
  t.plan(1)
  sandbox.start((_end)=> {
    end = _end
    t.ok(true, 'opened')
  })
})

test('get /en/getting-started/introduction', t=> {
  t.plan(1)
  tiny.get({
    url: 'http://localhost:3333/en/getting-started/introduction'
  },
  function win(err, result) {
    if (err) {
      t.fail(err, err)
    }
    else {
      t.ok(true, 'got result')
    }
    console.log(err)
  })
})

test('sandbox.end', t=> {
  t.plan(1)
  end()
  t.ok(true, 'closed')
})
