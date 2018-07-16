## Overview

Begin isn't just responsible for provisioning and orchestrating your app's serverless infrastructure, it's also a fully integrated CI/CD build pipeline optimized for serverless architecture.

Begin builds run entirely in cloud functions, so they spin up fast and run in parallel as quickly as you can push changes.

The `Builds & Deploys` view – your default view in Begin - shows all your app's builds, deploy status, and corresponding log data.

![Begin screenshot](https://s3.us-west-1.amazonaws.com/begin-docs/begin-screenshot-home-1.png)

Deploying to Begin is as simple as pushing to `master` or cutting a git tag.

Deployments to `staging` and `production` take only seconds are instantly available at scale – enjoy the benefits of near-instant iteration with frequent pushes!


## Build pipeline

Begin offers three hosted environments out of the box: `testing`, `staging`, and `production`. (Of course, Begin also supports full [local development](/en/getting-started/quickstart/#working-locally).)

Within these environments, Begin follows a fairly traditional CI/CD build pipeline:
- `testing` - Commits to `master` kick off CI; green builds deploy to `staging`
- `staging` - Runs latest green build from `master`; clicking the `Deploy to Production` button in the left nav in Begin (or cutting a git tag) deploys to `production`
- `production` - Runs the latest `production` release


## Deploying to `staging`

Each push to `master` kicks off Begin CI.

The last step for each green build is a `staging` deploy.

The current running version on `staging` is represented by the commit SHA, and can be found in the upper left corner of Begin.


## Deploying to `production`

Deploys to `production` can only occur when the latest `staging` build is green. Cut a `production` release by:
  - Using the `Deploy to Production` button in the left nav in Begin, or
  - Creating a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), i.e.:
```bash
git tag -a 1.0.1 -m "This release includes 20% more cowbell"
git push origin 1.0.1
```
  - Or also by cutting a [GitHub Release](https://help.github.com/articles/creating-releases/)

The current running version on `production` is represented by the version you specified in your tag, and can be found in the upper left corner of Begin.

> 👓 Note: We strongly encourage the use of [SemVer](https://semver.org/) when creating `production` releases!


## Configuring build steps

Begin CI executes three default, non-configurable steps: ([`verify`](#verify), [`install`](#install), and [`deploy`](#deploy)); and three optional, configurable steps: [`build`](#build), [`lint`](#lint), and [`test`](#test). In order of execution:


### **Verify**

Responsible for validating the repo payload from git and prepping Begin's infrastructure for a deployment.

This step is non-configurable and does not output logs.


### **Install**

Responsible for installing dependencies via npm to all routes (`src/(css|html|js|json|text|xml)/*`) and `shared` (`src/shared`).

This step is non-configurable and does output logs.

> Note: dependencies in your project's root `package.json` are not available to your routes.
>
> To install per-route deps, cd into the route's folder and install from there.
>
> To install global deps, install them to `shared` (`src/shared`) – but mind dependency bloat, routes must weigh in at under 5MB uncompressed!


### **Build**

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


### **Lint**

**Optional, but highly recommended!**

Runs eslint by default (o the linter of your choice). Defined in your Begin app's default `package.json` (and for hopefully obvious reasons we strongly suggest not removing it):

```js
{
  "scripts": {
    "lint": "eslint src --ignore-pattern node_modules --fix",
  }
}
```


### **Test**

**Optional, but highly recommended!**

Defines your test procedures. Like `lint`, it's defined in your Begin app's default `package.json` (and we strongly recommend expanding your app's tests):


```js
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```


### **Deploy**

Ah, the step we've been waiting for!

Provided all other build steps `exit(0)`, Begin takes over again to orchestrate deployment, which primarily includes:
- Deploying all routes to their corresponding Lambda cloud functions
- Deploying static assets (`.static/*`) to your app's S3 bucket

The deploy step is non-configurable and does not currently output logs (but will in the future).
