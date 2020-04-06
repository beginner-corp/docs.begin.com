## Overview

Events give your app a publish-subscribe (pub/sub) messaging system. Subscribe a Lambda function to an Event Topic and then asynchronously publish JSON payloads to it. It coordinates and manages the delivery or sending of messages to subscribing endpoints or clients.

Oh, and provisioning new Event Functions is a cinch!

## Provisioning new Event Functions

To provision a new Event Function, in the root of your project, open your app's Architect project manifest file (usually `.arc`):

1. Find your project's `@events` pragma
    - If you don't already have one, just add `@events`
2. On a new line, enter the event name you wish to create
For example: `account-signup`, or `account-check-email`
3. Start the local dev environment to generate some boilerplate Event Function handlers: `npm start`
    - New function handlers will now appear in `src/events/` (e.g. `src/events/account-signup` & `src/events/account-check-email`)
4. Commit and push your changes to your repo

Here's what a basic Architect project manifest looks like with the above two **Event Functions** specified:

```
@app
your-app-name

@events
account-signup
account-check-email
```
> ⚠️ Event names are lowercase alphanumeric and can contain dashes. It is recommended to create a naming convention to group similar events and (ideally) keep them single purpose.

After specifying new Event Functions in your Architect project manifest and pushing your changes to your repo, the following things happen automatically:

- New infrastructure is provisioned to make the event(s) publicly available – this may take a few moments to spin up
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

That's all there is to it! Now let's take a closer look at the capabilities of Event Functions, and how they work.

## The basics

Each **Event Function** (@event pragma) creates an event topic. Events are named channels that distribute messages to all of it's subscribers. Event handlers are subscribers that can hand off work to different services in your application. 

### Create event subscriber

The event handler is called the "subscriber". An event handler subscribes to messages on the named event topic. The handler function accepts an event object that can be processed further. 

```js
// src/events/oh/index.js

exports.handler = async function (event) {
  console.log('got event', JSON.stringify(event, null, 2))
  return true
}
```
### Create event publisher
Publishers communicate asynchronously with subscribers by producing and sending a message to a topic, which is a logical access point and communication channel. 

```js
// src/http/post-oh/index.js

let arc = require('@architect/functions')

async function oh() {
  await arc.events.publish({
    name: 'oh', 
    payload: { 
      message: 'hello oh',
      timestamp: new Date(Date.now()).toISOString()
    }
  })
  return { location: '/' }
}

exports.handler = arc.http.async(oh)
```

## Common use-cases

### Fanout

The "fanout" scenario is when an Event Function message is sent to a topic and then replicated and pushed to multiple subscribers. This is especially useful for sending the same bit of important information to multiple components of your app that need it.

### Application and system alerts

Application and system alerts are notifications that are triggered by predefined thresholds and sent to specified users by SMS and/or email. For example, you can receive immediate notification when an event occurs, such as a specific change to your apps background tasks.

### Summary

The best way to think about Event Functions is to ask yourself "What sort of computational tasks can I run in the background?". Some common examples are: 

- saving files
- compiling data and saving it to a data-store
- creating backups of databases

Event Functions run longer and only takes milliseconds to initiate. They are extremely useful and a powerful feature to use in your serverless architecture.