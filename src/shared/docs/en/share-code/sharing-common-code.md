## Overview

Applications tend to share logic, templates, and other assets. Begin gives you a simple, seamless way to share modules, templates, and other files across your project's many functions.

Given the following `app.arc` file:

```bash
@app
testapp

@http
get /
get /about
get /contact
post /contact
```

You would have the following file system layout:

```bash
/
├── src
│   └── http
│       ├── get-index/
│       ├── get-about/
│       ├── get-contact/
│       └── post-contact/
├── app.arc
└── package.json
```

Sweet! However, what if a number of endpoints need to share the same layout file, or some middleware?


## The magical `src/shared` and `src/views` directories

Create either or both `src/shared` and `src/views` directories. 

- All files within the src/shared directory will automatically be available to each of your project's functions.
- All files within the `src/views` directory will be automatically available to all of your `GET` functions.

```bash
  /
  ├── src
  │   ├── http
  │   │   ├── get-index/
  │   │   ├── get-about/
  │   │   ├── get-contact/
  │   │   └── post-contact/
> │   ├── shared/
> │   └── views/
  ├── app.arc
  └── package.json
```

In the above example, files found in `src/shared` will be copied into every function's `node_modules/@architect/shared` directory.

Similarly, files found in `src/views` will be copied into `/node_modules/@architect/shared` directory as well, but only `GET` handlers and not `POST`:

- `GET /`
- `GET /about`
- `GET /contact` 

You can also specify a list of `@http` functions you want `src/views` to target by specifying them in the `@views` section of your `app.arc` file.

An example of this would look like:

```bash
@app
testapp

@http
get /
get /about
get /contact
get /gallery
get /css/:stylesheet
post /contact

@views
get /
get /about
```

Here's an example of what we mean. What we've done is added two new routes:

- `/gallery` 
- `/css/:stylesheet`

We then declared that only two of the routes in this project should receive a copy of the modules in `src/views`:

- `/`  
- `/about` 

## Hydrate

Begin will refresh your functions' shared code whenever you:

- Start up `npx sandbox` (or `arc.sandbox` in tests)
- Run `npx deploy`
- Run `npx hydrate`

## Example

Create `src/shared/layout.js`:

```javascript
module.exports = function layout(body) {
  return `
  <html>
    <body>
      <h1>layout</h1>
      ${body}
    </body>
  </html>
  `
}
```

And then in your Lambda handlers you can reference `@architect/shared/layout` like so:

```javascript
let layout = require('@architect/shared/layout')

exports.handler = async function http(req) {
  return {
    body: layout('hello world')
  }
}
```

Anytime you preview locally, run tests, or deploy the layout, your shared modules get updated. 

> Caution! Since `src/shared` gets copied recursively into all Lambdas' node_modules we strongly suggest keeping the directory structure as flat as possible, and the payloads as small possible, so as not bloat your Lambda functions and suffer worse cold starts.



