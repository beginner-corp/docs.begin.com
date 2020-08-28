## Overview

`arc.http.async` is a middleware style helper that accepts multiple `async` functions and executes them in order. Each execution returns a Lambda function compatible signature to modify the `request` object. This allows you to combine multiple `async/await` operations in a single HTTP function.

`arc.http.async()` accepts `async` functions as arguments, and returns a Lambda-compatible function signature. 

Requests run through each middleware function in the order they are passed to `arc.http.async()` with the following rules:

- Each function receives a `request` as the first argument
  - If the `request` has a session or body, it will automatically be decoded, parsed, and attached to the `request` object
- If a function doesn't return anything, the `request` will then be passed to the next function
- If a function returns a modified `request`, the modified `request` will be passed to the next function
- If a function returns a `response`, this will end processing and emit the `response` to the client

```js
let arc = require('@architect/functions')

async function first(request) {
  //modify the request object
  return request
}

async function second(request) {
  // use modified request from first()
  return response
}

exports.handler = arc.http.async(first, second)
```

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

### Requests

Requests are run through each middleware function in the order they are passed to `arc.http.async()` with the following rules: 

 - Each function receives a `request` object as the first argument
  - If the `request` has a `session` or `body` key, it will automatically be decoded, parsed, and attached to the request object.
- If a function does not return, the `request` is passed to the next function
- If a function returns a modified `request` object, the modified object will be passed to the next function
- If a function returns a `response` object, this will end processing and emit the `response` to the client

- `request` is an Object that has the following keys: 
- `body` - any `application/x-www-form-urlencoded` form variables as a plain Object
- `path` - absolute path of the request
- `method` - one of `GET`, `POST`, `PATCH`, `PUT` and `DELETE`
- `params` - any URL params defined
- `query` - any query params defined
- `headers` - a plain Object of request headers
- `session` - a plain Object representing the current session

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

### Middleware

Common use cases include 
- authentication
- tracking user interactions
- invoking asynchronous Lambda functions like `@events`, `@scheduled`, and `@queues`

## Example

In the following example this Lambda function has multiple `async` functions to modify the request object and validate the user's session.

```js
let arc = require('@architect/functions')

// Add a 'countryCode' attribute to the request
async function addCountryCode(request) {
  // AWS already does this with req.headers['CloudFront-Viewer-Country']
  // but for other cloud providers you can use your preferred geoIP module
  // ... or just pretend everyone is in New Zealand!
  request.countryCode = 'NZ'
  // The modified request will be used in subsequent steps
  return request
}

// Redirect if the user isn't logged in
async function requireLogin(request) {
  let state = request.session

  if (!state.isLoggedIn) {
    console.log(`Attempt to access dashboard without logging in!`)
    // if the user is not logged in, redirect to login page and end execution
    return {
      status: 302,
      location: `/login`
    }
  }
  console.log(`We're logged in`)
  // return nothing, so execution continues
}

// Show a HTML page. If we've reached this step we know the user is logged in, and we know their country code!
async function showDashboard(request) {
  console.log(`Showing dashboard`)

  let body = `
  <body>
    <h1>Dashboard</h1>
    <p>You are logged in from ${request.countryCode}! <a href="/logout">logout</a><p>
  </body>`
  // returns HTML to the client
  return {
    status: 200,
    type: 'text/html',
    body
  }
}

exports.handler = arc.http.async(addCountryCode, requireLogin, showDashboard)
```