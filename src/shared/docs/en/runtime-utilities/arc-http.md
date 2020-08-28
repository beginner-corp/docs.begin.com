## Overview

Architect provides two optional middleware helpers for cutting down on boilerplate HTTP operations.

Both middleware helpers conveniently attach user sessions to incoming `request` object (if applicable), and decode and parse the `request` body (again, if applicable).

Use whatever feels right for your project and team needs!

- `arc.http` is a classic continuation-passing style middleware API for working with HTTP requests & responses while still being compatible with Lambda functions.
  - Functions similarly to Express, and supported since the earliest versions of Architect
- [`arc.http.async`](/en/runtime-utilities/arc-http-async) is an `async/await` style middleware API

          
## Install

### Install runtime helpers for Node

```bash
cd path/to/lambda
npm init -f
npm install @architect/functions
```

### Install runtime helpers for Ruby

```bash
cd path/to/lambda
bundle init
bundle install --path vendor/bundle
bundle add architect-functions
```

### Install runtime helpers for Python

```bash
cd path/to/lambda
pip install --target ./vendor architect-functions
```

To use our runtime helpers inside of a module in your node environment, simply require as shown below.

```javascript
let arc = require('@architect/functions')
```
          
## Usage

### Getting started

`arc.http` registers one, or more, functions with the signature `(req, res, next) =>`. This functions similarly to Express middleware conventions, including the use of `next()` to continue function calls with the modified request object before resolving with a response. 

```javascript
let arc = require('@architect/functions')

function route(req, res) {
  let html = '<h1>hello world</h1>'
  res({html})
}

exports.handler = arc.http(route)
```

### Requests

**`req` has the following keys:**

- `body` any `application/x-www-form-urlencoded` form variables as a plain `Object`
- `path` absolute path of the request
- `method` one of `GET`, `POST`, `PATCH`, `PUT` and `DELETE`
- `params` any URL params defined
- `query` any query params defined
- `headers` a plain `Object` of request headers
- `session` a plain `Object` representing the current session

### Responses

**`res` is a function that accepts named parameters(Required):**

- `json`
- `html`
- `text`
- `css`
- `js`
- `xml`
- `location`

- Optionally: `session` to assign to the current session

- Optionally: `status` or `code` of:
    - `201` Created
    - `202` Accepted
    - `204` No Content
    - `400` Bad Request
    - `403` Forbidden
    - `404` Not Found
    - `406` Not Acceptable
    - `409` Conflict
    - `415` Unsupported Media Type
    - `500` Internal Serverless Error

- HTTP `POST` routes can **only** call `res` with `location` key and value of the path to redirect to.
- `session` can also optionally be set

> The default HTTP status code is `200`. A `302` is sent automatically when redirecting via `location`.

---

### Middleware

`arc.http` can accept multiple functions and execute them in the order they are passed. If the function does not end the request/response cycle, you must call `next()` to proceed to the next function, similar to Express style middleware. The final function call must end with a valid response object. 

In the following example we define `validate` middleware function. When this Lambda function is invoked, it will execute `validate()` then continue onto `handler()` and return the response to the client. 

```javascript
var arc = require('@architect/functions')
var sendEmail = require('./_send-email')

function validate(req, res, next) {
  var isValid = typeof req.body.email != 'undefined'
  if (isValid) {
    next()
  }
  else {
    res({
      session: {
        errors: ['email missing']
      },
      location: '/contact'
    })
  }
}

function handler(req, res) {
  sendEmail({
    email: req.body.email
  },
  function _email(err) {
    res({
      location: `/contact?success=${err? 'yep' : 'ruhroh'}`
    })
  })
}

exports.handler = arc.http(validate, handler)
```

### Things to understand:

- `arc.http` accepts one or more functions that follow Express-style middleware signature: `(req, res, next)=>`
- `req` is a plain JavaScript `Object` with `path`, `method`, `query`, `params`, `body` keys
- `res` is a function that must be invoked with named params:
  - `location` with a URL value (a string starting w `/`)
  - `session` (optional) a plain `Object`
- `res` can also be invoked with an `Error`
  - optionally the `Error` instance property of `code`, `status` or `statusCode` can be one of `403`, `404` or `500` to change the HTTP status code
- `next` (optional) is a function to continue middleware execution

## Example

Here's an example using `session` and `location`. First we render a form:

```javascript
// src/html/get-index

var arc = require('@architect/functions')

var form = `
<form action=/count method=post>
  <button>1up</button>
</form>
`

function handler(req, res) {
  var count = req.session.count || 0
  res({
    html: `<h1>${count}</h1><section>${form}</section>`
  })
}

exports.handler = arc.http(handler)

```

The form handler increments `req.session.count` and redirects back home.

```javascript
// src/html/post-count
var arc = require('@architect/functions')

function handler(req, res) {
  var count = (req.session.count || 0) + 1
  res({
    session: {count},
    location: '/'
  })
}

exports.handler = arc.http(handler)
```

          
