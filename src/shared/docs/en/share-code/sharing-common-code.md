## Overview

Applications tend to share logic, templates, and other assets. Begin gives you a simple, seamless way to share modules, templates, and other files across your project's many functions.

Given the following `.arc` file:

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
├── .arc
└── package.json
```

Sweet! However, what if a number of endpoints need to share the same layout file, or some middleware?


## The magical `src/shared` and `src/views` directories

Create either or both `src/shared` and `src/views` directories. 

- All files within the `src/shared` directory will automatically be available to each of the functions with your project. 
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
  ├── .arc
  └── package.json
```

In the above example, files found in `src/shared` will be copied into every function's `node_modules/@architect/shared` directory.

Similarly, files found in `src/views` will be copied into just `GET /`, `GET /about`, and `GET /contact`'s `/node_modules/@architect/shared` directories, but not `POST /contact`.

You can also specify a list of `@http` functions you want `src/views` to target by specifying them in the `@views` section of your `.arc` file. An example of this would look like:

```bash
@app
testapp

@http
get /
get /about
get /contact
post /contact

@views
get /about
```

What we've done is added two new routes - /about and /css/:stylesheet, then declared that two of the routes / and /about should receive a copy of the modules in src/views.

## Hydrate

Begin will refresh your functions' shared code whenever you:

- Start up `npx sandbox` (or `arc.sandbox` in tests)
- Run `npx deploy`
- Run `npx hydrate`

Example: create `src/shared/layout.js`:

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



