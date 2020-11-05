## Overview

It is increasingly common to slowly migrate existing sites, apps, and APIs; Begin makes this incredibly easy with its proxy functionality.

Existing applications can incrementally adopt serverless by way of Begin, peeling off individual routes and bits of functionality as you go.


## Adding the Begin proxy

Proxy enables Begin users to front another URL with a single definition in your app's `app.arc` file.

Simply add `@proxy` with a valid `testing`, `staging`, and `production` URL value, like so:

```arc
@http
get /

@proxy
testing http://localhost:3333
staging https://qa.example.com
production https://example.com
```

> `@proxy` relies on the existence of the `@http` pragma (which can be empty)

Any routes defined in the `@http` pragma will always win; otherwise all requests will pass through directly to each environment's configured URL. This is a great way to migrate any web accessible application!


## Example

Say you have an existing legacy API at `natureco.com` that you want to start migrating to serverless with Begin, but aren't yet ready to shut down. This API has the following routes:

```arc
get /api/:item
post /api/:item
put /api/:item
```

With the following in your `app.arc` file, you will forward all `get`, `post`, `put`, and any other requests to your legacy API:

```arc
@http

@proxy
testing http://localhost:3333
staging https://qa.natureco.com
production https://natureco.com
```

Now, when you're ready to build the logic for your `get /api/:item` route, simply add it to your `app.arc` file, like so:

```arc
@http
get /api/:item

@proxy
...
```

Now, HTTP `get` requests to `/api/:item` will run in your Begin app, while remaining requests are passed through to your existing API. Rinse, repeat, and eventually shut down that old API.
