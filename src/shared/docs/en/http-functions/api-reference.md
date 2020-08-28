## Overview

Say goodbye to web servers, web frameworks, routers, and tons of config – and say hello to **Begin HTTP functions**.

This doc assumes familiarity with the basics of [HTTP and request/response model](/en/http-functions/introduction), and [how Begin HTTP functions are provisioned](/en/http-functions/provisioning).


## Getting started

In a Begin app, each HTTP Function maps to a logical HTTP route. (We define a route as a tuple of HTTP method and path, e.g. `POST /api/submit`.)

You can think of HTTP Function as its own tiny app with a single responsibility: handling all business logic related to its corresponding HTTP route.

HTTP functions do not require dependencies to run, and feature a minimal but [powerful low-level API](#http-handler-api) that can be optionally extended (and further simplified) with a purpose-built [runtime library: (`@architect/functions`)](https://github.com/architect/functions).
<!-- TODO: add link to Begin Arc Fns docs-->

Within your project, each HTTP Function can contain and utilize an arbitrary quantity of modules, packages, shared code, and other files – so long as the total uncompressed size of that HTTP Function's folder is ≤5MB; this helps keep your HTTP functions (and thus your app) super fast.

> Begin apps created after September 2020 use API Gateway v2 (aka "HTTP" APIs) payloads; Begin apps created before September 2020 use legacy API Gateway v1 (aka API Gateway "REST" APIs) docs [please head here](/en/http-functions/api-reference-legacy).


## HTTP handler API

The HTTP handler API follows a simple [request](#requests) / [response](#responses) pattern. Let's look at an example of a basic HTTP Function:

```js
// src/http/get-index/index.js
let body = `
<!doctype html>
<html lang=en>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`

exports.handler = async function http (request) {
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body
  }
}
```

No sweat, right?


## Requests

Begin apps created after September 2020 use API Gateway v2 (aka "HTTP" APIs) payloads; Begin apps created before September 2020 use legacy API Gateway v1 (aka API Gateway "REST" APIs) docs [please head here](/en/http-functions/api-reference-legacy).

The `handler` function invoked by a client request receives a `request` object containing the following parameters:

- `version` - **String**
  - Payload version (always `2.0`)
- `routeKey` - **String**
  - Tuple of HTTP method (`GET`, `POST`, `PATCH`, `PUT`, or `DELETE`) and path; URL params are surrounded in braces
  - If path is not captured by a specific function, `routeKey` will be `$default` (and be handled by the `get /` function)
  - Example: `GET /`, `GET /shop/{product}`
- `rawPath` - **String**
  - The absolute path of the request
  - Example: `/`, `/shop/chocolate-chip-cookies`
- `pathParameters` - **not present** or **Object**
  - Any URL params, if defined in your HTTP function's path (e.g. `product` in `/shop/:product`)
  - Example: `{ product: 'chocolate-chip-cookies' }`
- `rawQueryString` - **String**
  - String containing query string params of request, if any
  - Example: `?someParam=someValue`, `''` (if none)
- `queryStringParameters` - **not present** or **Object**
  - Any query params if present in the client request
  - Example: `{ someParam: someValue }`
- `cookies` - **not present** or **Array**
  - Array containing all cookies, if present in client request
  - Example: `[ 'some_cookie_name=some_cookie_value' ]`
- `headers` - **Object**
  - All client request headers
  - Example: `{ 'accept-encoding': 'gzip' }`
- `requestContext` - **Object**
  - Request metadata, including `http` object containing `method` and `path` (should you not want to parse the `routeKey`)
- `body` - **not present** or **String (base64-encoded)**
  - Contains unparsed, base64-encoded request body
  - We suggest parsing with a [body parser helper](#parsing-bodies)
- `isBase64Encoded` - **Boolean**
  - Indicates whether `body` is base64-encoded binary payload

> Additional and extended versions of this and other data may be available in your `request`; for additional documentation, [please head to AWS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html).


### Example

Here's an example of an incoming `request` object, being handled by the HTTP Function `GET /salutations/:greeting`:

```js
// Client requested https://your-domain/salutations/hello-world?testing=123
{

  version: '2.0',
  routeKey: 'GET /salutations/{greeting}',
  rawPath: '/salutations/hello-world',
  pathParameters: { greeting: 'hello-world' },
  rawQueryString: 'testing=123,
  queryStringParameters: { testing: '123', },
  cookies: [ 'some_cookie_name=some_cookie_value' ],
  headers: {
    host: 'your-domain',
    connection: 'keep-alive',
    ...
  },
  requestContext: {
    http: {
      method: 'GET',
      path: '/salutations/hello-world'
    },
    routeKey: 'GET /salutations/{greeting}'
  },
  isBase64Encoded: false,
  // Node: no body is present, as this is a GET request
}
```

### Parsing bodies

All bodes are unparsed, base64-encoded strings; you can parse and process these however you please, but `@architect/functions` has a convenient method for doing so. Here's an example:

```js
// POST body includes form URL-encoded string: 'greeting=howdy'
let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser

exports.handler = async function http (request) {
  console.log(request.body)     // 'Z3JlZXRpbmc9aG93ZHk='
  let body = parseBody(request) // Pass the entire request object
  let greeting = body.greeting  // 'howdy'
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: greeting
  }
}
```


## Responses

Begin apps created after September 2020 use API Gateway v2 (aka "HTTP" APIs) payloads; Begin apps created before September 2020 use legacy API Gateway v1 (aka API Gateway "REST" APIs) docs [please head here](/en/http-functions/api-reference-legacy).

Responses are returned by your `handler` function in an object.

If you do not include the standard response parameters below, your response will be serialized to JSON, with a status code of `200` and a JSON `content-type` header (examples below).

Instead of using that JSON inference convenience, most people structure their responses using the following standard response parameters:

- `statusCode` - **Number** (required)
  - Sets the HTTP status code; usually to `200`
- `headers` - **Object** (optional)
  - All response headers
- `body` - **String** (optional)
  - Contains response body, either as a plain string, or, if binary, a base64-encoded buffer
  - Note: The maximum `body` payload size is 6MB; files being delivered non-dynamically should use the [Begin CDN](/en/getting-started/static-assets)
- `isBase64Encoded` - **Boolean** (optional)
  - Indicates whether `body` is base64-encoded binary payload; defaults to `false`
  - Required to be set to `true` if emitting a binary payload


### Example

Here's a simple example response for an API endpoint:

```js
// Responding to a successful POST
return {
  statusCode: 201,
  headers: { 'content-type': 'application/json; charset=utf8' },
  body: JSON.stringify({ ok: true }),
}
```


## Anti-caching headers

Many remote networks rely on overly aggressive reverse-proxy caches to conserve bandwidth; the absence of the `cache-control` header is often (mis)construed by such networks as tacit permission to aggressively cache responses that often should not be cached. **This external, network-level behavior can have serious ramifications for your app.**

Because of the highly adverse effects network-level caching can on your application, we strongly suggest that most HTTP Function responses include anti-caching headers – especially when returning `HTML` and `JSON` responses. For example:

```js
return {
  statusCode: 200,
  headers: {
    'content-type': 'text/html; charset=utf8',
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
  },
  body: `This definitely won't be cached.`
}
```

> One of the many benefits of using Begin's runtime library, [Architect Functions](https://github.com/architect/functions), is automatic, customizable, content-type aware generation of `cache-control` headers.
<!-- TODO: add link to Begin Arc Fns docs-->


## Persisting data

Every Begin app comes bundled with Begin Data, an easy to use, fast, durable, highly scalable, and fully managed key-value and document database.

Learn more [about integrating Begin Data](/en/data/begin-data/) in your app's Functions!


## Examples

### Basic web response using sessions

```js
let begin = require('@architect/functions')

exports.handler = async function http (request) {
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
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body
  }
}
```


### Forward a request

```js
exports.handler = async function http (request) {
  return {
    statusCode: 302,
    headers: { location: '/new/path' }
  }
}
```


### Write a request to [Begin Data](/en/data/begin-data/)

```js
let data = require('@begin/data')

exports.handler = async function http (request) {
  let headers = { 'content-type': 'application/json; charset=utf8 '}
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
      statusCode: 201,
      headers,
      body: JSON.stringify({ ok: true })
    }
  }
}
```

### Return an inferred JSON response

> Note: we do not advise using this approach, as you do not have control over the `cache-control` header, and your response may be cached by intermediary proxies, thus breaking your API

```js
exports.handler = async function http (request) {
  let response = { ok: true }
  return response
}
```
