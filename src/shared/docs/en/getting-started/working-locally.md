## Overview

Begin has full support for local, offline development, including support for [Begin Data](/en/data/begin-data/).

After you've initialized your project locally, Begin's open core, [Architect](https://arc.codes) kicks up a local server that emulates key serverless services (such as Lambda, API Gateway, DynamoDB, etc.).

Those workflows enable you to locally:
- **Preview** - run your code locally, to be opened in a web browser, curl, etc.
- **Test** - run your code headlessly in a terminal

This guide is an expanded reference to much of what we covered in the [quickstart](/en/getting-started/quickstart) if you'd like to [skip ahead](/en/routes-functions/creating-new-routes/).


## Getting set up

Get started working locally on your app in five easy steps. Assuming you used the default name of `Begin app`, open your terminal app, and:

1. Clone your app's repo to your local machine:
```bash
git clone https://github.com/{your GH username}/begin-app.git
```

- cd to your Begin project directory:
```bash
cd begin-app
```

- Install NPM packages:
```bash
npm install
```

- Hydrate your app's dependencies:
```bash
npx hydrate
```

- Start the app locally:
```bash
npm start
```

That's it, you're up and running locally!


### Previewing changes

All changes to your application's business logic within a Function directory (e.g. `src/http/get-hello-world`) will be immediately available without requiring a restart.

However, changes to shared code in `src/shared/` or `src/views/` do require a local server restart. For this, a tool like [`nodemon`](https://nodemon.io/) can be helpful.

Here's an example nodemon config to add to your `package.json`:

```json
"scripts": {
  "start": "nodemon --exec NODE_ENV=testing ARC_LOCAL=1 npx sandbox",
},
"nodemonConfig": {
  "watch": [
    "src/shared",
    "src/views"
  ],
  "ext": "css,js,json,md,mjs"
}
```


## Working with routes

The Begin web UI is (currently) responsible for creating new HTTP routes. (A command line interface is in the works, though!)

To create new a new HTTP route: open Begin, click the `Functions` view in the left nav, then click `Add a Function`, and select your HTTP method and path.

New routes will be automatically committed to your project; run `git pull && npx hydrate` to continue working locally with your new routes.

> ✨ Tip: `npx hydrate` is a helpful Begin tool to learn; it traverses your routes (e.g. `src/http/**`) and shared code(`src/shared`, `src/views`), finds any `package.json` files, and (re)installs your modules.


## Writing tests

Begin apps come provisioned with `tape` and some boilerplate tests in the `test` directory.

```js
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```

While you can use any test runner and reporter combo you want, the TAP family is strongly recommended; test suites that require test runners to inject globals create difficult-to-debug situations.

> ⚠️ Begin requires `NODE_ENV=testing` to be present in your `npm test` scripts, regardless of the test framework you're using.
