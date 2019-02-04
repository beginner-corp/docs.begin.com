## Overview

Begin CSS routes respond with HTTP `Content-Type: text/css`, and support routes with [`GET`](#get-routes).

Each CSS route (example: `GET /views/css`) in your app is assigned a folder in your project under `src/css/` (i.e. `src/css/get-views-css/`).

Within your project, each route can contain and utilize an arbitrary quantity of modules, packages, and other files (so long as the total uncompressed size of that route's folder is ≤5MB).
<!-- @todo more about cloud function limits doc(s) -->

CSS routes work well as an origin for your app's pre-compiled styles, but they're also surprisingly excellent at compiling in real time, which can be quite useful for iterating rapidly.

> Note: Begin routes are plain AWS Lambda functions, and can function without requiring `@architect/functions`. However, we do not suggest removing that require, as you will lose middleware and session support.

---

## `GET` routes

Let's look at the default code for new CSS `GET` routes:

```js
// src/css/get-*/index.js
let begin = require('@architect/functions')

function route(req, res) {
  let request = JSON.stringify(req, null, 2)
  console.log('hello backend', request)
  res({
    css: `body { background: pink; }`
  })
}

exports.handler = begin.css.get(route)
```


## `begin.css.get()`

Invoked by the route's `handler`, `begin.css.get()` accepts one or more functions that follow an [Express-style middleware](https://expressjs.com/en/guide/writing-middleware.html) signature: `(req, res, next)`

## Parameters

### `req`

`req` returns a JavaScript object with the following keys:

- `method` - HTTP method (always returns `get`)
- `path` - path requested (i.e. `/views/css`)
- `headers` - object containing HTTP request headers
- `query` - object containing query string fields & values
- `body` - always returns empty object
- `params` - object containing path params (returned empty unless your route contains params)
- [`session`](/en/routes-functions/sessions/) - object containing session data
- `csrf` - signed cross-site request forgery token (generated with all requests, but primarily intended to be used with HTML `POST` routes)


### `res()`

`res()` is a function that must be invoked; it accepts a JavaScript object with the following keys:

- Either `css` or `location` (**required**)
  - `css` - a string containing CSS content
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

Examples coming shortly, please stand by!
