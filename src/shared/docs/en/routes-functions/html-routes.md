## Overview

Begin HTML routes respond with HTTP `Content-Type: text/html`, and support routes with [`GET`](#begin-html-get-) and [`POST`](#begin-html-post-) methods.

Each HTML route (example: `GET /about`) in your app is assigned a folder in your project under `src/html/` (i.e. `src/html/get-about/`).

Within your project, each route can contain and utilize an arbitrary quantity of modules, packages, and other files (so long as the total uncompressed size of that route's folder is ≤5MB).
<!-- @todo more about cloud function limits doc(s) -->

By default, all Begin apps are provisioned a HTML `GET /` route that cannot be deleted.

> Note: Begin routes are plain AWS Lambda functions, and can function without requiring `@architect/functions`. However, we do not suggest removing that require, as you will lose middleware and session support.

---

Let's look at the default code for new HTML `GET` routes:

```js
// src/html/get-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    html: 'Hello world!'
  })
}

exports.handler = begin.html.get(route)
```

## `begin.html.get()`

Invoked by the route's `handler`, `begin.html.get()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `get`)
- `path` - path requested (i.e. `/hello-world`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - always returns empty object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions/) - object containing session data
- `csrf` - signed cross-site request forgery token (generated with every request; use `req._verify` to validate the token

### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `html` or `location` (**required**)
  - `html` - a string containing HTML content
  - `location` - a URL, either absolute or relative; sets HTTP status to `302` without using the `status` key
- [`session`](/en/routes-functions/sessions/#how-sessions-work) (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

`res()` can also be invoked with an instance of `Error`. You can also optionally define the `Error` object's HTTP status code by adding to it a `status`, `code`, or `statusCode` property (with one of the seven status codes above).


### `next` (optional)

Callback argument to continue execution.


## `GET` examples


### Example `GET` request

```js
// Client request made to GET /:greeting
{ method: 'get',
  path: '/hello-world',
  headers: {
    host: 'begin.com',
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    dnt: '1',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8',
    Cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8'
  },
  query: { testing: '123' },
  body: {},
  params: { greeting: 'hello-world' },
  _idx: 'LbyL0kPK2xOLfdm_WnESzlsG',
  _secret: 'Sll0QZV2ouuvlOCSN3Msx1KP',
  csrf: 'aGQxg6ye-G_U-IXvLioZbmak3kFBCB8286aQ',
  session: { isLoggedIn: true }
}
```


### Including the requested path in your response

```js
let begin = require('@architect/workflows')

function route(req, res) {
  res({
    html: `<blink>The current path is: ${req.path}</blink>`
  })
}

exports.handler = begin.html.get(route)
```


### Evaluating a request's query string

```js
let begin = require('@architect/workflows')

function route(req, res) {
  let html = `
  <h1>Change the query string</h1>
  <ul>
    <li><a href=${req._url('/?foo=bar')}>foobar</a></li>
    <li><a href=${req._url('/?foo=bar&hello=world')}>baz</a></li>
    <li><a href=${req._url('/?foo=buzz')}>buzz</a></li>
  </ul>
  <pre>${JSON.stringify(req.query, null, 2)}</pre>
  `
  res({html})
}

exports.handler = begin.html.get(route)
```


### Reading a client's session

Read the session:

```js
let begin = require('@architect/workflows')

function route(req, res) {
  let html = `
  <h1>Current Session</h1>
  <form action=${req._url('/')} method=post>
    <button>1up</button>
  </form>
  <pre>${JSON.stringify(req.session, null, 2)}</pre>
  `
  res({html})
}

exports.handler = begin.html.get(route)
```

Write to the session:

```js
// post /
let begin = require('@architect/workflows')

function route(req, res) {
  let location = req._url('/')
  let count = req.session.count || 0
  count += 1
  res({location, session:{count}})
}

exports.handler = begin.html.post(route)
```

[More on Begin sessions here!](/en/routes-functions/sessions/)


### Responding with a 404 error

```js
let begin = require('@architect/workflows')

function route(req, res) {
  let notFound = Error('not found')
  notFound.code = 404
  res(notFound)
}

exports.handler = begin.html.get(route)
```


### Forwarding a request to another URL

```js
let begin = require('@architect/workflows')

function route(req, res) {
  let notFound = Error('not found')
  notFound.code = 404
  res(notFound)
}

exports.handler = begin.html.get(route)
```

---

Now let's take a look at the default code Begin uses to provision new HTML `POST` routes:

```js
// src/html/post-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({
    location: req._url('/')
  })
}

exports.handler = begin.html.post(route)
```


## `begin.html.post()`

Invoked by the route's `handler`, `begin.html.post()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

Unlike `GET` routes, `POST` routes can only call `res()` with an object containing a `location` key (and the value of the path to redirect to), and, optionally, a `session` object.


## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `post`)
- `path` - path requested (i.e. `/contact`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - `POST` body object
- `params` - object containing path param
- [`session`](/en/routes-functions/sessions/#how-sessions-work) - object containing session data


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- `location` (**required**) - a URL, either absolute or relative
- `session` (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports the following values:
  - `400` - Bad Request
  - `403` - Forbidden
  - `404` - Not Found
  - `406` - Not Acceptable
  - `409` - Conflict
  - `415` - Unsupported Media Type
  - `500` - Internal Server Error

`res()` can be invoked with an `Error`. You can also optionally define the `Error` object's HTTP status code by adding a `status`, `code`, or `statusCode` property (with one of the seven status codes above) to it.


### `next` (optional)

Callback argument to continue execution.


## `POST` examples

```js
// coming soon, stand by!
```

---

## Custom error pages

Begin's default error response template can be overridden by adding `error.js` to your route's directory in your project (i.e. `src/html/get-index/error.js`).

`error.js` exports a single default function that accepts an `Error` and returns a non-empty String.

```js
// src/html/get-*/error.js
module.exports = function error(err) {
  return `
<!doctype html>
<html>
  <body>
    <h1>${err.message}</h1>
    <pre>${err.stack}</pre>
  </body>
</html>
  `
}
```
