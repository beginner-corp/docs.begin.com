# Welcome to Begin!

> ⏱ This guide should require less than 5 minutes

Getting started building with Begin is remarkably fast and simple.

**Once you're finished with this guide, you'll be ready to build and scale just about any kind of web application, API, or site with speed, ease, and grace.**

First let's review what you need to get going.


## Prerequisites

While this guide assumes general familiarity with such things as text editors, terminal interfaces, git, and basic software development in JS with Node.js, you do not need to be a CTO to use Begin (or this guide)!


### tl;dr, you'll need:
- A (free) GitHub account
- Any computer running macOS, Windows, or Linux, with:
  - Node.js 14, or later
  - npm 6, or later


### Platforms: macOS, Windows, and Linux

Begin supports local, offline development on just about all modern computers, including: macOS, Windows (10+), and Linux.


### Runtimes: Node.js

Begin provisions and manages AWS infrastructure that runs on Node.js (with support for additional runtimes coming soon). Node.js 12.x is the default runtime, but you can [configure](https://arc.codes/docs/en/reference/project-manifest/aws#runtime) Node.js 14.x to be the runtime on a per-project or per-function level.

> When working locally with Node versions 14 or later, be aware if your app depends on any features, functionality, or fixes that are not available in Node 12. For example, if you are using [Optional chaining operator (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) or the [Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) you will want to [configure](https://arc.codes/docs/en/reference/project-manifest/aws#runtime) your application to use the Node.js 14.x runtime.

You can grab [Node.js here](https://nodejs.org/en/download/).


### Package management: NPM

Begin requires npm 6.x or later for local development. Check which version of npm you are running `npm version`. If you are not running npm 6.x or later, you'll want to make sure to upgrade with: `npm install npm@latest -g`


### Version control: GitHub

Begin hosts project repos on GitHub; if you don't have one already, [sign up for a free GitHub account here](https://github.com/join).

When you create a new app, Begin will provision your GitHub repo pre-wired with the integrations it needs, such as webhooks to Begin's CI.

> Begin only requests the least-privileged set of permissions required to work with GitHub, and does not attempt to access any other repositories or personal data.


## Create a Begin account

To create a Begin account, simply click the `Login` button on the [Begin home page](https://begin.com) to authorize with GitHub. That's it!


## Creating an app

![Begin new app selector](/_static/screens/originals/begin-app-create-selection-2.png)

After creating your Begin account, select an app from the list of starter apps to build from. (We think the `Personal website` is a great place to start, but this guide applies to all Begin apps.)

Then name your app and repo, and Begin will spin up your new project repository under `github.com/{your GH username}/{your repo name}`, and populate it with a fully functional Begin app.

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions via in the `Settings` screen found in the left nav of your Begin app.


## Your first deploy

![Begin activity](/_static/screens/begin-activity.jpg)

Immediately after Begin is finished setting up your project repo, it will kick off its first deploy to your app's `staging` environment.

By default, each commit to `main` initiates a build; if the build is green, that build is immediately deployed to your app's `staging` environment. No fuss, no muss!

Every new build to `staging` and `main` appears on in your **Activity** feed.

Learn more about [building & deploying with Begin](/en/getting-started/builds-deploys/).

<!-- @todo - link to upcoming environments + deploys doc(s) re. deploying to main -->


## Accessing your live app

Once deployed, your app will be immediately live and available on the internets. Nice! 🎉

To access your `staging` environment, click `Staging` link in the build status module in the top of the left nav bar.


## Project structure

Now that your app is live in `staging`, a brief word about how Begin apps are structured so you'll know your way around.

Begin applications are comprised of many small, fast, individually executing cloud functions (or Functions, for short). Let's take a quick look at the source tree of a basic Begin app:

```bash
.
├── public/
└── src/
    ├── http/
    │   └── get-index/
    ├── shared/
    └── views/
```

Your app's many small, fast, isolated Functions are organized in your project under `src/`.

Each HTTP Function directory services a handler for a publicly available HTTP route (e.g. `src/http/get-hello-world` services `GET /hello/world`).

So if you want to make a change to your app's root view, you'll want to modify its `src/http/get-index/index.js` file.

> Learn more about [Begin app project structure](/en/getting-started/project-structure/).


## Working locally

Get started working locally on your app in five easy steps. Assuming you used the default name of `Begin app`, open your terminal app, and:

1. Clone your app's repo to your local machine:
```bash
git clone https://github.com/{your GH username}/begin-app.git
```

- cd to your Begin project directory:
```bash
cd begin-app
```

- Install npm packages:
```bash
npm install
```

- Start the app locally:
```bash
npm start
```

Learn more about [getting set up in our Introduction](/en/getting-started/introduction/).


## That's it!

In just a few minutes, you now have a fresh app with dedicated `staging` and `production` environments, a fast local, offline dev environment, pre-wired CI/CD, and everything you need to rapidly iterate.

Happy building!


## Ship to `production`

- Release to `production` by:
  - Using the `Deploy to Production` button in the left nav in Begin, or
  - Creating a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), i.e.:
```bash
git tag -a 1.0.1 -m "This release includes 20% more cowbell"
git push origin 1.0.1
```
  - Or also by cutting a [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

> 👓 Note: We strongly encourage the use of [SemVer](https://semver.org/) when creating `production` releases!


### Keep learning

There are many fun things to learn about building Begin apps, [check out the rest of our docs here!](/en/getting-started/introduction)
