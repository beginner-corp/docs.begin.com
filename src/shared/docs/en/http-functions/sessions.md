## Overview

Begin provides first-class, zero configuration sessions support for all HTTP routes. Begin sessions are fast, cryptographically signed, and you get them for free. How convenient!

If you opt to use the `@architect/functions` helper library, every request to an HTTP route is automatically tagged to a session, with state available via `req.session`. Here's an example:

```js
let begin = require('@architect/functions')

async function handler (req) {
  // Log session state
  console.log(req.session)
  // ... and render it in a browser
  let body = `
    <h1>Session state</h1>
    <pre>${JSON.stringify(req.session, null, 2)}</pre>
  `
  return {
    statusCode: 200,
    body
  }
}

exports.handler = begin.http.async(handler)
```


## Writing to sessions

Session state can only be written to in a response (usually during an HTTP redirect). An example:

```js
let begin = require('@architect/functions')

async function addOne (req) {
  let count = (req.session.count || 0) + 1
  let session = { count }
  let location = '/'
  return {
    statusCode: 200,
    session,
    location
  }
}

exports.handler = begin.http.async(addOne)
```

Writing to a session clobbers its previous state. If you want to merge session data, you have to explicitly author that behavior in your route's code.

Keeping state mutations super explicit in your code makes it easier to reason about, like so:

```js
let begin = require('@architect/functions')

async function updateUserName (req) {
  let account = req.session.account
  account.username = 'Alice'
  let session = { account }
  let location = '/'
  return {
    statusCode: 200,
    session,
    location
  }
}

exports.handler = begin.http.async(updateUserName)
```


## More about sessions

- `req.session` is just a plain JavaScript object containing the current session data
- `req.session` can be no larger than 400KB
- All sessions are automatically renewed indefinitely with continued use
- Unused sessions are expunged after one week of inactivity

> 🍪 Begin cookies are `HttpOnly` and are cryptographically signed.


## Examples

Sessions are often used for authentication; implementing an OAuth login with something like GitHub or Slack is fairly trivial.

Session state is also useful for passing error messages from a failed `POST`.

### Example `GET` request

```js
{
  method: 'get',
  path: '/en/routes-functions/html-functions/',
  statusCode: 200,
  headers:
  {
    host: 'docs.begin.com',
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Gojira/5.0',
    accept: 'text/html',
    dnt: '1',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8',
  },
  query: {},
  body: {},
  params: {},
  session: {
    isLoggedIn: true
  }
}
```


### Auth via `POST`, which writes to the `session`, and `302`s to `index`

```js
let begin = require('@architect/functions')

async function login (req) {
  let { body } = req
  let isLoggedIn = body.email === 'admin' && body.password === 'a-secure-password'

  return {
    statusCode: 200,
    session: { isLoggedIn },
    location: '/'
  }
}

exports.handler = begin.http.async(login)
```


### Checks `session` for the logged-in state (and forwards accordingly)

```js
let begin = require('@architect/functions')

async function auth (req) {
  if (req.session.isLoggedIn) {
    // Returning advances to the next middleware function
    return
  }
  else {
    return {
      statusCode: 200,
      location: '/login'
    }
  }
}

function index (req) {
  return {
    statusCode: 200,
    body: `Hi there, you're logged in! <a href="/logout">Logout</a>`
  }
}

exports.handler = begin.http.async(auth, index)
```
