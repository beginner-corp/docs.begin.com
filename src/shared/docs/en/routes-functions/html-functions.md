## Overview

Begin HTML Functions respond with HTTP `Content-Type: text/html`, and support routes with [`GET`](#arc-html-get-) and [`POST`](#arc-html-post-) methods.

Each HTML route (example: `GET /about`) in your app is represented by a Function, and each Function is assigned a folder in your project under `src/html/` (i.e. `src/html/get-about/`).

Within your project, each Function can contain and utilize an arbitrary quantity of modules, packages, and other files (so long as the total uncompressed size of that Function's folder is ≤5MB).
<!-- @todo more about cloud Function limits doc(s) -->

By default, all Begin apps are provisioned a HTML `GET /` route that cannot be deleted.

> Note: Begin Functions require `@architect/functions`; removing this require will cause your route to stop responding
<!-- @todo - Is this strictly true? should we mention the ability to clone arc's functionality if you so desire? ehhhh -->

Let's look at a basic HTML `GET` Function:

```js
// src/html/get-index/index.js

var arc = require('@architect/functions')

function route(req, res) {
  res({
    html: `Hello world!`
  })
}

exports.handler = arc.html.get(route)
```

## `arc.html.get()`

Invoked by the Function's `handler`, `arc.html.get()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

## Parameters

### `req`

Returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `GET`)
- `path` - path requested (i.e. `/about`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - always returns empty object 
- `params` - object containing path param
- `session` - object containing session data


### `res`

Function that must be invoked; accepts a JavaScript object with the following keys:

- Either `html` or `location`
  - `html` - a string containing HTML content
  - `location` - a URL (either absolute or relative); sets HTTP status to `302` without using the `status` key
- `session` (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports: `400`, `403`, `404`, `406`, `409`, `415`, or `500`


### `next` (optional)

Callback argument to continue execution.


## `GET` examples


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
     Cookie: undefined },
  query: {},
  body: {},
  params: { lang: 'en', cat: 'routes-functions', doc: 'html-functions' },
  _idx: '{idx}',
  _secret: '{secret}',
  csrf: '{csrf token}',
  session: {}
}
  ```


### Including the requested path in your response

```js
//
```


### Evaluating a request's query string

```js
//
```


### Reading a client's session

```js
//
```


### Responding with a 404 error

```js
//
```


### Forwarding a request to another URL

```js
//
```

---

## `arc.html.post()`

Invoked by the Function's `handler`, `arc.html.post()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

Unlike `GET` routes, `POST` routes can only call `res` with an object containing a `location` key (and the value of the path to redirect to), and, optionally, a `session` object.


## Parameters

### `req`

Returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `POST`)
- `path` - path requested (i.e. `/contact`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - 
- `params` - object containing path param
- `session` - object containing session data


### `res`

Function that must be invoked; accepts a JavaScript object with the following keys:

- `location` - a URL (either absolute or relative)
- `session` (optional) - object containing session data
- `status` (optional) - alternately `code` or `statusCode`, sets HTTP error status code, supports: `400`, `403`, `404`, `406`, `409`, `415`, or `500`


### `next` (optional)

Callback argument to continue execution.


## `POST` examples

tktk
