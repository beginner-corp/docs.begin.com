Alright, let's dive in! Getting started with Begin only takes a few minutes.

First, let's review what you need to start building with Begin.


## Prerequisites

### tl;dr
- macOS, Windows, or Linux
- Node.js 8.10(+)
- NPM 6.x
- GitHub account


### Platforms: macOS, Windows, and Linux

Begin supports local, offline development on just about all modern computers, including: macOS, Windows (10+), and Linux.


### Runtime: Node.js 8.10

Begin provisions and manages AWS infrastructure that runs solely on Node.js 8.10, with support additional runtimes coming in the near future.

You can work locally with versions of Node other than 8.10, but your app shouldn't depend on any features, functionality, or fixes that are not available in Node 8.10.

You can grab [Node latest](https://nodejs.org/en/download/) here, or [v8.10 here](https://nodejs.org/dist/v8.10.0/).


### Package management: NPM 6.x

Begin requires NPM 6.x for local development. Recent releases of Node bundle NPM 5.6.0, so you'll want to make sure to upgrade with: `npm install npm@latest -g`


### Version control: GitHub

Begin relies on GitHub as the host of your project repo (as well as your Begin login). [Sign up for GitHub here](https://github.com/join).

When you create a new app, Begin will also provision a new single route (`GET /`) repo, pre-wired with webhooks to CI.

Begin always and only requests the least-privileged set of permissions required to work with GitHub.

> Free-tier Begin app repos can be set to private, but will require additional permissions. Make sure you adjust your private token settings in the `Settings` screen found in the left nav.


## Create a Begin account

To create a Begin account, simply click the `Login` button on the [Begin home page](https://begin.com), and authorize it with GitHub. That's all!

> Begin only requests the least-privileged set of permissions required to work with GitHub, and does not attempt to access any other repositories or personal data.


## Creating an app

After authorizing Begin with GitHub, click the gigantic `Create App` button.

<!-- @todo - update soon with expanded information on app creation -->

This will spin up your new project repository under `github.com/{your GH username}/{your app name}`, populate it with a fully functional Hello World app, and associate it with Begin.

> Since not all GitHub users have paid accounts with private repos, by default your new app is set up as a public GitHub repo. If you can and want to, feel free to make your Begin app repo private!


## Your first deploy

Immediately after Begin is finished setting up your project repo, it will kick off its first deploy to your app's `staging` environment.

By default, each commit to `master` initiates a build; if the build is green, that build is immediately deployed to your app's `staging` environment. No fuss, no muss!

Every new build to `staging` and `master` appears on Begin's home screen: **Builds & Deploys**.

Learn more about [building & deploying with Begin](/en/getting-started/builds-deploys/).

<!-- @todo - link to upcoming environments + deploys doc(s) re. deploying to master -->


## Accessing your live app

Once deployed, your app will be immediately live and available on the internets.

To access your `staging` Hello world app, click `Staging` link in the build status module in the top of the left nav (or go click on `Functions`, go to `GET /` route, and click the `View: Staging` link).


## Project structure

Begin applications are comprised of many small, fast, individually executing cloud Functions. Let's take a quick look at the source tree of a basic Begin app:

```bash
.
├── public/
├── src/
│   ├── http/
│   │   └── get-index/
│   ├── shared/
|   └── views/
└── test/
```

Your app's many small, fast, isolated cloud functions (or Functions, for short) are organized in your project under `src/`.

Each Function directory services a handler for a publicly available HTTP route (e.g. `src/http/get-hello world` services `GET /hello/world`).

Learn more about [Begin app project structure](/en/getting-started/project-structure/).


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

That's it, you're up and running! Learn more about [working locally](/en/getting-started/working-locally/).


## Keep it going

### Create new routes

- Create new HTTP routes by opening Begin, clicking `Functions` in the left nav, and clicking the `Add a Function` buttons
  - New routes will be automatically committed to your project
  - Run `git pull && npx hydrate` to set up your new routes locally


### Ship to `production`

- Lint and run tests, of course:
```bash
npm run lint && npm t
```
- Release to `production` by:
  - Using the `Deploy to Production` button in the left nav in Begin, or
  - Creating a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), i.e.:
```bash
git tag -a 1.0.1 -m "This release includes 20% more cowbell"
git push origin 1.0.1
```
  - Or also by cutting a [GitHub Release](https://help.github.com/articles/creating-releases/)

> 👓 Note: We strongly encourage the use of [SemVer](https://semver.org/) when creating `production` releases!
