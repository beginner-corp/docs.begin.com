## Overview

Begin's open core, [Architect](https://arc.codes) kicks up a local server that emulates key serverless services (such as Lambda, API Gateway, DynamoDB, etc.) supporting full offline, local workflows.

Those workflows enable you to locally:
- **Preview** - code runs locally and can be opened in a web browser, curl, etc.
- **Test** - code runs headlessly in a terminal

This guide is an expanded reference to much of what we covered in the [quickstart](/en/getting-started/quickstart) if you'd like to [skip ahead](/en/routes-functions/creating-new-routes/).


## Getting set up

Get started working locally on your app in five easy steps:

1. Clone your app's repo to your local machine:
```bash
git clone https://github.com/{your GH username}/begin-functions-app.git
```

- cd to your Begin project directory:
```bash
cd begin-functions-app
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


### Adding Nodemon

Nodemon works well with Begin. To use it, simply install it to your project's root as a devdep, and update the start script in your `package.json`:

```js
{
  "scripts": {
    "start": "nodemon --watch src/ -e js,json --exec NODE_ENV=testing ARC_LOCAL=1 npx sandbox",
  }
}
```


## Working with routes

The Begin web UI is (currently) responsible for creating new routes. (A command line interface is in the works, though!)

To create new `HTML`, `JSON`, `XML`, `JS`, `CSS`, and `text` routes, open Begin, click the `Add new route` buttons in the left nav, and follow the prompt

New routes will be automatically committed to your project; run `git pull && npx hydrate` to continue working locally with your new routes.

> ✨ Tip: `npx hydrate` is a helpful Begin tool to learn; it traverses your routes (`src/(css|html|js|json|text|xml)/*`) and `shared` (`src/shared`), finds any `package.json` files, and (re)installs your modules.


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
