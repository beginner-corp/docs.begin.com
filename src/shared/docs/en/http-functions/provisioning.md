## Overview

What used to be web servers, web frameworks, routers, and tons of config is now **Begin HTTP functions**.

When an HTTP request comes in, your HTTP functions are responsible for (synchronously) handling responses. (Longer-running async tasks can be farmed out to **[Begin event functions](/en/event-functions/provisioning)**.)

Begin HTTP functions are fast, lightweight, stateless, isolated, highly durable, and require no configuration.

Oh, and provisioning new HTTP functions is a cinch!


## Provisioning new HTTP functions

To provision a new HTTP function, in the root of your project, open your app's Architect project manifest file (usually `app.arc`):

1. Find your project's `@http` pragma
  - If you don't already have one, add to a new line: `@http`
2. On a new line, enter the route (an HTTP method followed by a path) you wish to create
  - For example: `get /foo`, or `put /bar`
3. Start the local dev environment to generate some boilerplate HTTP function handlers: `npm start`
  - New function handlers will now appear in `src/http/` (e.g. `src/http/get-foo` & `src/http/put-bar`)
4. Commit and push your changes to your repo

Here's what a basic Architect project manifest looks like with the above two HTTP functions specified:

```arc
@app
your-app-name

@http
get /foo
put /bar
```

After specifying new HTTP functions in your Architect project manifest and pushing your changes to your repo, the following things happen automatically:

- New infrastructure is provisioned to make the route(s) publicly available – this may take a few moments to spin up
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

That's all there is to it! Now let's take a closer look at the capabilities of HTTP functions, and how they work.


## The basics

Each HTTP function maps to a logical HTTP route. For example:
- `get /` is serviced by the HTTP function in your project at `src/http/get-index`
- `get /about` is serviced by `src/http/get-about`
- `post /form` is serviced by `src/http/post-form`
- And so on...

All HTTP functions begin with `/`, and can include letters, numbers, and slashes, underscores, dashes, and periods, up to 35 characters.

Importantly and uniquely, you can also use URL parameters to build dynamic paths – [more on that below](#using-url-parameters-to-create-dynamic-paths).

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same path. For example: `get /contact-us` and `post /contact-us` is totally valid, as you'd expect.


## Greedy root

By default, your app's root is greedy – which means that *unless specified, all paths and HTTP methods will invoke it*. Any HTTP functions you define manually will be prioritized over the root. For example:
- With only `get /` specified: submitting a `POST` request to `/foo` will invoke `src/http/get-index`
- With both `get /` and `post /foo` specified: submitting the same request will invoke `src/http/post-foo`

The greedy root also means you can run large amounts of your application's logic from a single `get /` HTTP function. However, we don't advise it! One of the key advantages to building with cloud functions is their inherent isolation: many smaller functions means greater ease in debugging and faster deploys.


## Using URL parameters to create dynamic paths

It's possible to build dynamic paths using [Express-style URL parameters](http://expressjs.com/en/guide/routing.html#route-parameters), like: `get /shop/:product`

URL parameters are passed to your route via the `req.pathParameters` object. ([Learn more about HTTP requests here.](/en/http-functions/api-reference#requests))

For example, the route used to serve this page is `get /:lang/:cat/:doc` ([view source](https://github.com/smallwins/docs.begin.com/blob/master/src/http/get-000lang-000cat-000doc/index.js)).

When a client requests the path `/en/functions/provisioning/`, the HTTP function handling this route receives a `req` object containing:

```js
{
  pathParameters: {
    lang: 'en',
    cat: 'http-functions',
    doc: 'provisioning'
  }
}
```

If we were to navigate to the [Quickstart doc](/en/guides/quickstart), the same HTTP function would receive a `req` object containing:

```js
{
  pathParameters: {
    lang: 'en',
    cat: 'guides',
    doc: 'quickstart'
  }
}
```

You can do a lot with this functionality!

> Note: Slashes still function as path part delimiters within URL params, so `get /api/:foo` will service `get /api/hello`, but will not service `get /api/hello/there`.
> To handle `get /api/hello/there`, create a second HTTP function for `get /api/:foo/:bar`


## Removing HTTP functions

You can remove HTTP functions from your app the same way you add them: by modifying your Architect project manifest (`app.arc`) file.

Once pushed to your repo, any routes removed from your project's `@http` pragma will be removed from `staging`; your `production` routes will not be changed until you deploy to production.

> Note: Removing routes from your project will not result in any changes to your git repo, so you will find the `src/http/` folder still retains your HTTP function code.
