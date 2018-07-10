Alright, let's dive in! Getting started with Begin only takes a few minutes.

First, let's review what you need to start building with Begin.


## Prerequisites

### tl;dr
- macOS, Windows, or Linux
- Node.js 8.10(+)
- NPM 6.x
- GitHub account


### Platforms: macOS, Windows, and Linux

Begin supports local development on just about all modern computers, including: macOS, Windows (10+), and Linux.


### Runtime: Node.js 8.10

The AWS infrastructure that Begin orchestrates runs solely on Node.js 8.10. (We do indeed have plans to support additional runtimes in the future!)

You can work locally with versions of Node other than 8.10, but your app shouldn't depend on any features, functionality, or fixes delivered not available in 8.10.

You can grab [Node latest](https://nodejs.org/en/download/) here, or [v8.10 here](https://nodejs.org/dist/v8.10.0/).


### Package management: NPM 6.x

Begin requires NPM 6.x for local development. Recent releases of Node bundle NPM 5.6.0, so you'll want to make sure to upgrade with: `npm install npm@latest -g`


### Version control: GitHub

Begin relies on GitHub as both the host of your project's git repository (as well as your Begin login). [Sign up for GitHub here](https://github.com/join).


## Create a Begin account

To create a Begin account, simply click the `Login` button on the [Begin home page](https://begin.com), and authorize it with GitHub. That's all!

> Begin only requests the permissions it needs to work with GitHub, and does not access any of your other repositories.


## Creating an app

After authorizing Begin with GitHub, click the gigantic `Create App` button.

<!-- @todo - update soon with expanded information on app creation -->

This will spin up your new project repository under `github.com/{your GH username}/begin-functions-app`, populate it with a fully functional Hello World app, and associate it with Begin.

> Since not all GitHub users have paid accounts with private repos, by default your new app is set up as a public GitHub repo. If you can and want to, feel free to make your Begin app repo private!


## Your first deploy

Immediately after Begin is finished setting up your project repo, it will kick off its first deploy to your app's `staging` environment.

By default, each commit to `master` initiates a build; if the build is green, that build is immediately deployed to your app's `staging` environment. No fuss, no muss!

Every new build to `staging` and `master` appears on Begin's home screen: **Builds & Deploys**.

<!-- @todo - link to upcoming environments + deploys doc(s) re. deploying to master -->


## Accessing your live app

Once deployed, your app will be immediately live and available on the internets.

To access your `staging` Hello world app, click the `GET /` route in the left nav, and click the `View: Staging` link.


## Project structure

Let's take a closer look at the boilerplate Begin added to your project. Without all the standard Node and Git project files (like `package.json` and `.gitignore`) your project should look something like this:

```bash
.
├── src/
│   ├── html/
│   │   └── get-index/
│   │       └── index.js
│   └── shared/
└── test/
    ├── 00-html-test.js
    └── 01-data-test.js
```

Begin projects are organized primarily around routes (and events, coming soon).

<!-- @todo - expand this section with references to "routes and events" when we add @events and @scheduled -->

The handler for each route is grouped under `src` by the kind of `Content-Type` it delivers; each route maps to a separate, fully isolated, publicly accessible, and independently deployable Lambda cloud function.

- `src/` - source root folder containing all your project's routes
  - `html/` - organizing folders that group routes by their `Content-Type`; other route types include `json`, and (coming soon) `css`, `js`, `text`, and `xml`
    - `get-index/` - route folder, contains everything needed to respond to HTTP `GET` requests at `/`
  - `shared/` - a utility folder that makes its contents available across all your routes; think: per-project globally installed modules
- `test/` - test root for your app's tests (run locally via `npm run test`)

> ⚠️ While we totally encourage you to add files, subfolders, node modules, etc. to your individual routes, moving or renaming the route folders themselves will break your application.

<!-- @todo - link to upcoming project structure doc(s) -->


## Working locally

Get started working locally on your app in four easy steps:

1. Clone your app's repo to your local machine:
```bash
git clone git@github.com:{your GH username}/begin-functions-app.git
```

- cd to your Begin project directory:
```bash
cd begin-functions-app
```

- Install npm packages:
```bash
npm install
```

- Hydrate your app's dependencies
```bash
npx hydrate
```

- Start the app locally:
```bash
npm start
```

That's it, you're up and running locally!

---

### Keep it going

- Create new `HTML`, `JSON`, `XML`, `JS`, `CSS`, and `text` routes by opening Begin, clicking the `Add new route` buttons in the left nav, and following the prompt
  - New routes will be automatically committed to your project
  - Run `git pull && npx hydrate` to continue working locally with your new routes

- Lint and run tests:
```bash
npm run lint && npm t
```

- Release to `production` by:
  - Using the `Deploy to Production` button in the left nav in Begin, or
  - Creating a git tag, i.e.:
```bash
git tag -a 1.0.1 -m "This release includes 20% more cowbell"
git push origin 1.0.1
```
  - Cutting a [GitHub Release](https://help.github.com/articles/creating-releases/)

> 👓 Head here to learn more about [git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) and [GitHub releases](https://help.github.com/articles/about-releases/).
>
> Note: We strongly encourage the use of [SemVer](https://semver.org/) when creating production releases!
