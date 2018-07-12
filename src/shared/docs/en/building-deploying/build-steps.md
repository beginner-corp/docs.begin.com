## Overview

Begin CI runs up to six build steps, three of which are default, non-configurable steps: ([`verify`](#verify), [`install`](#install), and [`deploy`](#deploy)); and three are optional, configurable steps: [`build`](#build), [`lint`](#lint), and [`test`](#test).

In this doc we'll review the basics of each step, including configuration. In order of execution:


## Verify

Responsible for validating the repo payload from git and prepping Begin's infrastructure for a deployment.

This step is non-configurable and does not output logs.


## Install

Responsible for installing dependencies via npm to all routes (`src/(css|html|js|json|text|xml)/*`) and `shared` (`src/shared`).

This step is non-configurable and does output logs.

> Note: dependencies in your project's root `package.json` are not available to your routes.
>
> To install per-route deps, cd into the route's folder and install from there.
>
> To install global deps, install them to `shared` (`src/shared`) – but mind dependency bloat, routes must weigh in at under 5MB uncompressed!


## Build

**Optional**

Runs an arbitrary build script defined in your project's root `package.json` like so:

```js
{
  "scripts": {
    "build": "./scripts/build"
  }
}
```

This is a great place to generate static assets (to be deployed via the `.static` folder) or implement a bundler such as Webpack or Parcel.


## Lint

**Optional, but highly recommended!**

Runs eslint by default (o the linter of your choice). Defined in your Begin app's default `package.json` (and for hopefully obvious reasons we strongly suggest not removing it):

```js
{
  "scripts": {
    "lint": "eslint src --ignore-pattern node_modules --fix",
  }
}
```


## Test 

**Optional, but highly recommended!**

Defines your test procedures. Like `lint`, it's defined in your Begin app's default `package.json` (and we strongly recommend expanding your app's tests):


```js
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```


## Deploy

Ah, the step we've been waiting for!

Provided all other build steps `exit(0)`, Begin takes over again to orechestrate deployment, which primarily includes:
- Deploying all routes to their corresponding Lambda cloud functions
- Deploying static assets (`.static/*`) to your app's S3 bucket

The deploy step is non-configurable and does not currently output logs (but will in the future).
