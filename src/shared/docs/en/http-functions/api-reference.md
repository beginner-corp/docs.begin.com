## Overview

Say goodbye to web servers, web frameworks, routers, and tons of config – and say hello to **Begin HTTP Functions**.

This doc assumes familiarity with the basics of [how Begin HTTP Functions are provisioned](/en/http-functions/provisioning).


## Getting started

In a Begin app, each HTTP Function maps to a logical HTTP route. (We define a route as a tuple of HTTP method and path, e.g. `POST /api/submit`.)

You can think of HTTP Function as its own tiny app with a single responsibility: handling all business logic related to its corresponding HTTP route.

HTTP Functions do not require dependencies, and feature a minimal but [powerful low-level API](#http-handler-api) that can be optionally extended (and further simplified) with our [runtime library (`@architect/functions`)](https://github.com/architect/functions).
<!-- TODO: add link to Begin Arc Fns docs-->

Within your project, each HTTP Function can contain and utilize an arbitrary quantity of modules, packages, shared code, and other files – so long as the total uncompressed size of that HTTP Function's folder is ≤5MB; this helps keep your HTTP Functions (and thus your app) super fast.


## HTTP handler API

The HTTP handler API follows a simple [request](#requests) / [response](#responses) pattern. Let's look at an example of a basic HTTP Function:

```javascript
// src/http/get-index/index.js
let body = `
<!doctype html>
<html lang=en>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`

exports.handler = async function http(request) {
  return {
    headers: {'Content-Type': 'text/html; charset=utf8'},
    body
  }
}
```

No sweat, right?


## Requests

The `handler` function invoked by a client request receives a `request` object containing the following parameters:

- `httpMethod` - **String**
  - One of `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
- `path` - **String**
  - The absolute path of the request
- `pathParameters` - **Object**
  - Any URL params, if defined in your HTTP Function's path (e.g. `foo` in `GET /:foo/bar`)
- `queryStringParameters` - **null** or **Object**
  - Any query params if present in the client request
- `headers` - **Object**
  - All client request headers
- `body` - **String (base64-encoded)**
  - Contains unparsed, base64-encoded request body
  - We suggest parsing with our [body parser helper](#parsing-bodies)
- `isBase64Encoded` - **Boolean**
  - Indicates whether `body` is base64-encoded binary payload

> Additional and extended versions of this and other data may be available in your `request`; for additional documentation, [please head here](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format).


### Example

Here's an example of an incoming `request` object, being handled by the HTTP Function `GET /salutations/:greeting`:

```javascript
// Client requested https://begin.com/hello-world?testing=123
{
  httpMethod: 'GET',
  path: '/salutations/hello-world',
  headers: {
    host: 'begin.com',
    connection: 'keep-alive',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    dnt: '1',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    Cookie: '_idx=LbyL0kPK2xOLfdm_WnESzlsG.8kStzevVXstnEkosp0k5PK2xOz3e820NtoEx1b3VXnEC8'
  },
  queryStringParameters: {testing: '123'},
  pathParameters: {greeting: 'hello-world'},
  body: null,
  isBase64Encoded: false
}
```

### Parsing bodies

All bodes are unparsed, base64-encoded strings; you can parse and process these however you please, but `@architect/functions` has a convenient method for doing so. Here's an example:

```javascript
// Request is form URL-encoded string: 'greeting=howdy'
let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser

exports.handler = async function http(request) {
  console.log(request.body)     // 'Z3JlZXRpbmc9aG93ZHk='
  let body = parseBody(request) // Pass the entire request object
  let greeting = body.greeting  // 'howdy'
  return {
    headers: {'Content-Type': 'text/html; charset=utf8'},
    body: greeting
  }
}
```


## Responses

Responses are returned by your `handler` function in an object, and use the following parameters:

- `statusCode` - **Number**
  - Sets the HTTP status code; defaults to `200`
- `headers` - **Object**
  - All response headers
- `body` - **String**
  - Contains response body, either as a plain string (no encoding or serialization required) or, if binary, a base64-encoded buffer
  - Note: The maximum `body` payload size is 6MB; files being delivered non-dynamically should use the [Begin CDN](/en/getting-started/static-assets)
- `isBase64Encoded` - **Boolean**
  - Indicates whether `body` is base64-encoded binary payload; defaults to `false`
  - Required to be set to `true` if emitting a binary payload


### Example

Here's a simple example response for an API endpoint:

```javascript
// Responding to a successful POST
return {
  statusCode: 201,
  headers: {'Content-Type': 'application/json; charset=utf8'},
  body: JSON.stringify({ok: true}),
}
```


## Anti-caching headers

Many remote networks rely on overly aggressive reverse-proxy caches to conserve bandwidth; the absence of the `Cache-Control` header is often (mis)construed by such networks as tacit permission to aggressively cache responses that often should not be cached. **This external, network-level behavior can have serious ramifications for your app.**

Because of the highly adverse effects network-level caching can on your application, we strongly suggest that most HTTP Function responses include anti-caching headers – especially when returning `HTML` and `JSON` responses. For example:

```javascript
return {
  headers: {
    'content-type': 'text/html; charset=utf8',
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  },
  body: `This definitely won't be cached.`
}
```

> One of the many benefits of using Begin's runtime library, [Architect Functions](https://github.com/architect/functions), is automatic, customizeable, content-type aware generation of `Cache-Control` headers.
<!-- TODO: add link to Begin Arc Fns docs-->


## Persisting data

Every Begin app comes bundled with Begin Data, an easy to use, fast, durable, highly scalable, and fully managed key-value and document database.

Learn more [about integrating Begin Data](/en/data/begin-data/) in your app's Functions!


## Examples

### Basic web response using sessions

```javascript
let begin = require('@architect/functions')

exports.handler = async function http(request) {
  let session = await begin.http.session.read(request)
  let name = session.name || 'there'
  let body = `
<!doctype html>
<html lang=en>
  <body>
    <h1>Hello ${name}!</h1>
  </body>
</html>
`
  return {
    headers: {'Content-Type': 'text/html; charset=utf8'},
    body
  }
}
```


### Forward a request

```javascript
exports.handler = async function http(request) {
  return {
    statusCode: 302,
    headers: {location: '/new/path'}
  }
}
```


### Write a request to [Begin Data](/en/data/begin-data/)

```javascript
let data = require('@begin/data')

exports.handler = async function http(request) {
  let headers = {'Content-Type': 'application/json; charset=utf8'}
  if (!request.body.note) {
    return {
      statusCode: 204,
      headers,
      body: JSON.stringify({ok: false})
    }
  }
  else {
    let table = 'notes'
    let note = request.body.note
    await data.set({table, note})
    return {
      status: 201,
      headers,
      body: JSON.stringify({ok: true})
    }
  }
}
```
