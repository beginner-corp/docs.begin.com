## Overview

Begin has full support for local, offline development of your application, including support for [Begin Data](/en/data/begin-data/).

After you've initialized your project locally (i.e. cloned your repo and installed dependencies), our local dev server emulates production Begin infrastructure.

The dev server enables you to locally:
- **Preview** - run your code to be opened in a web browser, curl, etc.
- **Test** - run your code headlessly in a terminal

This is an expanded reference some of the topics covered in the [quickstart guide](/en/guides/quickstart).


## Getting set up

Get started working locally on your app in four easy steps. Assuming you used the default name of `Begin app`, open your terminal and:

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

- Start the app locally:
```bash
npm start
```

That's it, you're up and running locally!


### Previewing changes

All changes to your application's business logic within a Function directory (e.g. `src/http/get-index`), as well as shared code (e.g. files in `src/shared/` or `src/views/`) are immediately available without requiring a dev server restart.


## Working with routes

The Begin web UI is responsible for creating new HTTP routes. (A command line interface is in the works, though!)

Each HTTP route corresponds to an HTTP Function, so creating `GET /foo` will add `src/http/get-foo` to your project.

To create new a new HTTP route: open Begin, click the `Functions` view in the left nav, then click `Add a Function`, and select your HTTP method and path.

New routes' Function code will be automatically committed to your project; run `git pull` to start working locally with your new routes.

> ✨ Tip: if your local dev server is running when you pull down your new HTTP Function, it will automatically mount your new route and install its dependencies – no restart required!


## Writing tests

Begin apps come with some boilerplate tests in the `test` directory.

```js
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```

While you can use any test runner and reporter combo you want, the TAP family is strongly recommended; test suites that require test runners to inject globals can create some very difficult to debug situations.

> ⚠️ Begin requires `NODE_ENV=testing` to be present in your `npm test` scripts, regardless of the test framework you're using.
