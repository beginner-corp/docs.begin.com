## Overview

Begin provides first-class sessions support for all HTTP routes with zero configuration. They're fast, secure, and you get them for free. How convenient!

## How sessions work

All HTTP routes in a Begin app support session state via `req.session`.

```javascript
let begin = require('@architect/functions')

function route(req, res) {
  // log session state 
  console.log(req.session)
  // and render it in a browser
  let html = `
    <h1>Session state</h1>
    <pre>${req.session}</pre>
  `
  res({html})
}

exports.handler = begin.html.get(route)
```

Session state can only be written to in a response. Usually during an HTTP redirect.

```javascript
let begin = require('@architect/functions')

function addOne(req, res) {
  let count = (req.session.count || 0) + 1
  let session = {count}
  let location = req._url('/')
  res({session, location})
}

exports.handler = begin.html.post(addOne)
```

Writing to session clobbers previous state. If you want to merge session data you have to explicitly author that behavior in your lambda function code. Keeping state mutations super explicit in your code makes it easier to reason about.

```javascript
let begin = require('@architect/functions')

function updateUserName(req, res) {
  let account = req.session.account
  account.username = 'Alice'
  let session = {account}
  let location = req._url('/')
  res({session, location})
}

exports.handler = begin.html.post(updateUserName)
```

## Further Notes

- `req.session` is just a plain JavaScript object containing the current session data
- `req.session` can be no larger than 400KB
- All sessions are automatically renewed indefinitely with continued use
- Unused sessions are expunged after one week of inactivity

> 🔍 Session state is maintained via a cookie identifier `_idx` which is cryptographically signed with a secret. Begin cookies are `HttpOnly`.

## Examples

- Sessions are often used for authentication; implementing an oAuth login with something like Slack or Github is trivial
- Session state is also useful for passing error messages from a failed POST

### Example `GET` request

```js
{ method: 'get',
  path: '/en/routes-functions/html-functions/',
  headers:
   { host: 'docs.begin.com',
     connection: 'keep-alive',
     'cache-control': 'max-age=0',
     'upgrade-insecure-requests': '1',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
     dnt: '1',
     'accept-encoding': 'gzip, deflate, br',
     'accept-language': 'en-US,en;q=0.9',
     cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8',
     Cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8',
  query: {},
  body: { body: 'admin', password: 'a-secure-password' },
  params: {},
  _idx: 'LbyL0kPK2xOLfdm_WnESzlsG',
  _secret: 'Sll0QZV2ouuvlOCSN3Msx1KP',
  csrf: 'aGQxg6ye-G_U-IXvLioZbmak3kFBCB8286aQ',
  session: { isLoggedIn: true }
}
```


### Auth via `POST`, which writes to the `session`, and `302`s to index

```js
let begin = require('@architect/functions')

function login(req, res) {
  var isLoggedIn = req.body.email === 'admin' && req.body.password === 'a-secure-password'
  res({
    session: {isLoggedIn},
    location: req._url('/')
  })
}

exports.handler = begin.html.post(login)
```


### Checks `session` for the logged in state (and forwards accordingly)

```js
let begin = require('@architect/functions')

function auth(req, res, next) {
  if (req.session.isLoggedIn) {
    next()
  }
  else {
    res({
      location: req._url('/login')
    }) 
  }
}

function index(req, res) {
  res({
    html: `Hi there, you're logged in! <a href="/logout">logout</a>` 
  })
}

exports.handler = begin.html.get(auth, index)
```

