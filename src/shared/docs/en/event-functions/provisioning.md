## Overview

What used to be web servers, web frameworks, routers, and tons of config is now Begin HTTP Functions.

Begin HTTP Functions are fast, lightweight, stateless, isolated, highly durable, and require no configuration.

Oh, and provisioning new HTTP Functions is a cinch!

## Provisioning new Event Functions

To provision a new Event Function, in the root of your project, open your app's Architect project manifest file (usually .arc):

1. Find your project's @http pragma
    - If you don't already have one, just add @http
2. On a new line, enter the route (an HTTP method followed by a path) you wish to create
For example: get /foo, or put /bar
3. Start the local dev environment to generate some boilerplate HTTP Function handlers: npm start
    - New function handlers will now appear in src/http/ (e.g. src/http/get-foo & src/http/put-bar)
4. Commit and push your changes to your repo

Here's what a basic Architect project manifest looks like with the above two HTTP Functions specified:

```
@app
your-app-name

@event
get /foo
put /bar
```

After specifying new HTTP Functions in your Architect project manifest and pushing your changes to your repo, the following things happen automatically:

- New infrastructure is provisioned to make the route(s) publicly available – this may take a few moments to spin up
- A build is kicked off, and, if green, is deployed to staging (but not production, of course)

That's all there is to it! Now let's take a closer look at the capabilities of HTTP Functions, and how they work.

## The basics

Each HTTP Function maps to a logical HTTP route. For example:

- get / is serviced by the HTTP Function in your project at src/http/get-index
- get /about is serviced by src/http/get-about
- post /form is serviced by src/http/post-form
- And so on...

All HTTP Functions begin with /, and can include letters, numbers, and slashes, underscores, dashes, and periods, up to 35 characters.

Importantly and uniquely, you can also use URL parameters to build dynamic paths – more on that below.

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same path. For example: get /contact-us and post /contact-us is totally valid, as you'd expect.