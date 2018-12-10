# Overview

First, thanks for being one of the earliest Begin testers!

We heard your feedback about things we needed to improve in first version of the Begin private alpha, namely:

- Statically bound Content-Type-based Functions (i.e. `CSS` and `XML` Functions) were too confusing
- The navigation for these Functions was too busy and difficult to use
- The way Begin projects used static assets was too hard to find and set up
- Code sharing across Functions wasn't granular or simple enough


## What's new

We addressed all this feedback (and more) in our open core with [Architect 4 (Yeti)](https://blog.begin.com/introducing-architect-4-0-faster-lighter-simpler-serverless-59f6dc156bf2), and are now rolling it out to Begin! This includes:

- Web routes are now built with generic, [zero-dependency HTTP Functions, capable of any Content-Type and status code](/en/functions/http/)
- The new `public` folder easily syncs static assets and build artifacts
- Frontend code can be [shared even more easily with `views`](https://blog.begin.com/architect-4-1-serverless-meet-frontend-workflows-3b3dd457de9)
- [Adding CORS support to your Functions](https://blog.begin.com/enable-cors-on-your-serverless-application-with-a-single-boolean-e784fc061b22) is now simply a boolean
- Custom app names


## Transitioning your app

It pains us to say the very earliest batch of Begin apps have incompatible low-level APIs that meant we couldn't seamlessly migrate them to the new app infrastructure.

This impacted the first few hundred alpha apps, and we're really sorry! We weighed the gravity of the feedback we were getting, and opted to make this change while things are still very early.

We don't foresee any changes of this nature coming any time soon, and here's the good news:

- Your Begin app will continue running (should you want it to)
- When you delete your Begin app, you retain all of your code on GitHub
- Any code you already wrote is reusable, and can be migrated to next-gen Begin apps with only very minor changes (outlined below)


## Upgrading your existing codebase

To upgrade your existing codebase to Architect 4 Begin apps, follow these steps:

1. Delete your existing Begin app
  - Open your app
  - Click **Settings** in the nav
  - Scroll to the bottom and hit the **Delete your app** button (don't worry, this action won't touch GitHub)
2. Create a new app
  - Follow the steps to create a new free Begin app (enter an app name, etc.)
3. Re-create any routes that you'd like to reuse in your new app
  - Click **Functions**
  - Select the HTTP method and path and create your new HTTP Functions
4. Move over the code you'd like to reuse from your old codebase to your new codebase
5. If you're copying over your Function directories wholesale, make sure `@architect/functions` is updated in each route
  - `npx hydrate --update` from your project's root directory can help!
6. If you don't want to switch to the new [dependency-free Function response signature](http://localhost:4445/en/functions/http/#http-handler-api), switch your statically bound function handler's `begin` method to `http`, and remove the HTTP verb, like so:
```javascript
// old
exports.handler = begin.html.get(route)
```
```javascript
// new
exports.handler = begin.http(route)
```
7. Preview locally, commit and push, and you're good to go!


## Thank you!

Thank you for your patience. We wouldn't have made this change if it wasn't for the impassioned, thoughtful feedback of early Begin users like yourself, and we [can't wait to hear what you think](https://spectrum.chat/begin) about the improvements we've made to your Begin app experience.
