## Overview

What used to be web servers, web frameworks, routers, and tons of config is now quite simply **Begin HTTP Functions**.

Begin HTTP Functions are fast, lightweight, simple, highly durable, and require no configuration.

Oh, and provisioning new HTTP Functions is a cinch!


## Provisioning new HTTP Functions

Each new HTTP Function is assigned a folder in your project under `src/http/`, and this code is eventually deployed to its corresponding cloud function.

To provision a new HTTP Function [open your Begin App](https://begin.com) and open the Functions view in the left nav. Once there, simply:
1. Select the HTTP method for your new route (e.g. `POST`)
2. Enter the path for the route you wish to create (e.g. `/api/:item`)
3. Click `Add Function`

That's it. Now let's take a closer look at the capabilities of HTTP Functions, and how they work.


## The basics

Each HTTP Function maps to a logical HTTP route. For example:
- `GET /` is serviced by the HTTP Function in your project at `src/http/get-index`
- `GET /about` is serviced by `src/http/get-about`
- `POST /form` is serviced by `src/http/post-form`
- And so on...

All HTTP Functions begin with `/`, and can include letters, numbers, and slashes, underscores, dashes, and periods, up to 35 characters.

Importantly and uniquely, you can also use URL parameters to build dynamic paths – [more on that below](#using-url-parameters-to-create-dynamic-paths).

After clicking `Add Function`, the following things happen automatically:
- Your new HTTP Function is saved to your Begin app configuration
- New infrastructure is provisioned to make the route publicly available (this may take a moment)
- A basic handler for this route is committed to your project in the `src/http/` folder
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same path! For example: `GET /contact-us` and `POST /contact-us` is totally valid, as you'd expect.


## Using URL parameters to create dynamic paths

It's possible to build dynamic paths using [Express-style URL parameters](http://expressjs.com/en/guide/routing.html#route-parameters), like: `GET /shop/:product`

URL parameters are passed to your route via the `req.params` object. ([Learn more more about HTTP requests here.](/en/http-functions/api/#requests))

For example, the route used to serve this page is `GET /:lang/:cat/:doc` ([view source](https://github.com/smallwins/docs.begin.com/blob/master/src/http/get-000lang-000cat-000doc/index.js)).

When a client requests the path `/en/functions/creating-new-functions/`, the HTTP Function handling this route receives a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'http-functions',
    doc: 'provisioning'
  }
}
```

If we were to navigate to the [Quickstart doc](/en/guides/quickstart), the same HTTP Function would receive a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'guides',
    doc: 'quickstart'
  }
}
```

You can do a lot with this!

> Note: Slashes still function as path part delimiters within URL params, so `GET /api/:foo` will service `GET /api/hello`, but will not service `GET /api/hello/there`.
> To handle `GET /api/hello/there`, create a second HTTP Function for `GET /api/:foo/:bar`
