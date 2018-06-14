## Overview

Begin provides first-class sessions support for all HTTP routes. They're fast, secure, and you get them for free in the Begin API. How convenient!

It's also possible to roll your own sessions for your app, but generally we advise against it.


## How sessions work

Every request to an HTTP route in a Begin app is tagged to a session.

If a session doesn't already exist, requests automatically generate and store a new session, which is represented by a unique identifier (`_idx`), secret (`_secret`), and JavaScript object containing session data (`session`).

Responses set an `_idx` cookie, which has been cryptographically signed with the secret. For additional security, Begin cookies are `HttpOnly` and do not support JSON Web Tokens.

Subsequent requests populate the following keys in your route handlers' `req` object:

- `_idx` - client's unsigned session ID
- `_secret` - client's secret (obvious, but take care not to leak this anywhere in your application!)
- `session` - JavaScript object containing your client's current session data; can be no larger than 400KB


## Caveats

### Modifying sessions

While persisted session data can be mutated arbitrarily, sessions cannot be updated atomically per-key. Sessions can only be set or unset.


### Session duration

All sessions are automatically renewed indefinitely with continued use. Unused sessions are expunged after one week of inactivity.


### Sharing session data

Sessions are not shared between apps. So if you're building multiple Begin apps, even under the same domain, they cannot read each others' sessions at this time.


## Examples


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
    location: '/'
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
      location: '/login'
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

