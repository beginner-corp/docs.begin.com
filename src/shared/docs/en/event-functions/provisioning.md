## Overview

Asynchronously invoke background tasks in your application with **Begin event functions**.

Event functions give your app a publish-subscribe (pub / sub) message bus, enabling you to farm out complex or less time-sensitive tasks to a dedicated asynchronous event function. (Synchronous HTTP requests are handled by **[Begin HTTP functions](/en/http-functions/provisioning)**.)

Begin event functions are fast, lightweight, stateless, isolated, highly durable, and require no configuration.

Oh, and provisioning new event functions is a cinch!


## Provisioning new event functions

To provision a new event function, in the root of your project, open your app's Architect project manifest file (usually `app.arc`):

1. Find your project's `@events` pragma
  - If you don't already have one, add to a new line: `@events`
2. On a new line, enter the event name you wish to create
  - For example: `account-verify-email`
3. Start the local dev environment to generate some boilerplate event function handlers: `npm start`
  - New function handlers will now appear in `src/events/` (e.g. `src/events/account-signup` & `src/events/account-verify-email`)
4. Commit and push your changes to your repo

Here's what a basic Architect project manifest looks like with the above two **event functions** specified:

```
@app
your-app-name

@events
account-verify-email
```

> ⚠️ Event names are lowercase alphanumeric and can contain dashes. It is recommended to create a naming convention to group similar events.

After specifying new event functions in your Architect project manifest and pushing your changes to your repo, the following things happen automatically:

- New infrastructure is provisioned to make the event(s) publicly available – this may take a few moments to spin up
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

That's all there is to it! Now let's take a closer look at the capabilities of event functions, and how they work.


## The basics

You can think of each event function as a named subscriber, which can be invoked by publishing to it from any other function in your app (including HTTP functions).

The best way to think about event functions is to ask: "What sort of computational tasks can (or should) I be running in the background?" Some common examples may include: processing data and saving it to a data store (such as Begin Data), or saving files to S3.

Event functions are an extremely useful and versatile feature to add to your application's architecture!



## Publishing an event

The recommended (and easiest) way to publish an event is to use the `@architect/functions`. In the example below, assume an HTTP `post` endpoint is publishing an `account-verify-email` event:

```js
// src/http/post-account-create/index.js

let arc = require('@architect/functions')

async function accountCreate(req) {
  let { email } = req.body
  await arc.events.publish({
    name: 'account-verify-email',
    payload: {
      email
    }
  })
  return { location: '/' }
}

exports.handler = arc.http.async(accountCreate)
```

In it, the `accountCreate` function assumes a user has posted an email address to verify in a form; it then publishes its payload (the `email` in question) to the `account-verify-email` event, and redirects the user to the root.


## Subscribing to an event

On the other end of the published event is the subscriber – also known as our event function. This handler receives the incoming payload and executes its business logic.

Again, the recommended (and easiest) way to subscribe to events within your event function is to use the `@architect/functions`:

```js
// src/events/account-verify-email/index.js

let arc = require('@architect/functions')

async function accountVerifyEmail (event) {
  let { email } = event
  // ... do some email-related things here
  return
}

exports.handler = arc.events.subscribe(accountVerifyEmail)
```

Because the event is operating out of band from the HTTP function that invoked it, it does not need to return anything when it reaches completion.


## Removing event functions

You can remove event functions from your app the same way you add them: by modifying your Architect project manifest (`app.arc`) file.

Once pushed to your repo, any events removed from your project's `@events` pragma will be removed from `staging`; your `production` events will not be changed until you deploy to production.

> Note: Removing events from your project will not result in any changes to your git repo, so you will find the `src/events/` folder still retains your events code.
