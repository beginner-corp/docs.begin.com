> ⏱ This tutorial is an introductory walkthrough of creating a React app on Begin. It should take less than 15 minutes.

## Introduction

**Hello there, Beginner!**

This tutorial uses the [Create React App](https://github.com/facebook/create-react-app) starter app, extended by an example API endpoint. You'll have all the capabilities of React for building beautiful user interfaces, combined with the power, speed, and security of cloud functions and serverless data storage.


### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

Although it would be helpful to have some experience with React, it's not required to follow along with this tutorial. (Related, the [React docs](https://reactjs.org/) are a great reference.)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make a React app in Begin!

---

## Getting started

### Create your new React app

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-create-react-app)


### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: your Begin app name and repository name cannot be changed later.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin will spin up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Your first deploy

After creating your app, you'll be taken to its `Activity` stream. Welcome to the main backend interface of your Begin app!

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)

From the `Activity` view, you'll be able to watch your app build & deploy in real-time. Any time you push to `master`, you'll see a new build get kicked off in Begin.

Each build undergoes a number of predefined build steps (learn more about [build steps here](/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), check your code's syntax for issues (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your react app:

![react intro](/_static/screens/guides/create-react-app/react-intro.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/shared/begin-activity-2.jpg)

Look for this code, and try editing your basic app. Let's edit the `<p>` tag that says "Change me!" to "My app!":

```js
// Customize your site by changing the data below
return (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>{message}</p>
      <p>Change Me!</p> // ← Start by editing this!
```

Click the **commit changes** button on GitHub, and head back to your `Activity` view to watch it build.

When it's done, don't forget to see your changes live in your `staging` environment!

---

## Get set up locally

Next let's get your new site running in your local environment (i.e. the computer you work on).

First, head to your GitHub repo (from the first card in your `Activity`, or from the left nav). Find the **clone or download** button and copy the git URL.

Then head to your terminal and clone your repo to your local filesystem.

```bash
git clone https://github.com/your-github-username/your-new-begin-app.git
```

Once you've got your project cloned on your local machine, `cd` into the project directory, install your dependencies, and start the local dev server:

```bash
cd your-new-begin-app
npm install
npm start
```

You should see a `localhost` link in your terminal – go ahead and visit that in your browser.

That's all you need to do preview your changes locally before pushing them to `staging`!

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your personal website:

```bash
.
├── build/
├── public/
├── src/
│    ├── http/
│    │   └── get-api/
│    └── App.js
└── test/
```

Let's go over each of these directories and files and how you may use them:

### `build/`

The `build` folder is where your React app will build into (and be served from locally). Since this folder contains build artifacts, it isn't checked into git and shouldn't be directly modified. Instead, let your app re-build its contents.

Each time your app is deployed by Begin, the build artifacts in `build` will automatically be published to your app's static asset bucket (on [S3](https://aws.amazon.com/s3/)) as well as Begin's CDN.


### `public/`

Per Create React App convention, files placed into `public` are not processed, and will instead be copied into `build` when your app is built.

Add images (like your logo) and any other static assets or files to `public` to make them publicly accessible in your app. [Learn more about the `public` folder](https://create-react-app.dev/docs/using-the-public-folder).


### `src/http/get-api/`

The cloud function that handles example API requests is found at `src/http/get-api/`.

Some Begin apps are inert static web sites – but not this one. Your React app utilizes this built-in small, fast, individually executing cloud function that handles HTTP API requests and responses. (We call those HTTP functions, for short.)

The HTTP function that handles requests to `GET /api` is found in `src/http/get-api/`.

In the next section we will go more in-depth about how to provision HTTP functions in your React app.

> 💡 **Learn more!** Head here to dig deeper into [HTTP functions in Begin apps](/en/http-functions/provisioning/).


### `src/App.js`

Along with the other boilerplate React app files (`src/App.css`, `src/App-test.js`, etc.), `src/App.js` serves as the primary entry point for your React app. This is a great place to start tinkering with your app.


### `src/test/`

Your React project comes built-in with a few boilerplate tests to ensure that things are running smoothly in your app. We've even loaded some example tests for **web integration** & **Begin data** in the `src/test/example/` directory.

A solid platform is the foundation of a durable application, but tests are essential!

You can find the test script specified in package.json:

```js
// package.json
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```

Tests run via `npm test` or `npm t`.

While you can use any test runner and reporter combo you want, we recommend the [TAP family](https://testanything.org/) for testing. Test suites that require their runners to inject globals can create some very difficult to debug situations.

With that said, [Jest](https://jestjs.io/), [Enzyme](https://airbnb.io/enzyme/), [React Testing Library](https://github.com/testing-library/react-testing-library), etc. are all options available to you!

> 💡 **Learn more!** Head here to dig deeper into [the project structure of Begin apps](/en/getting-started/project-structure/).

---

## Using API endpoints

Now for the fun part! Let's go over how HTTP functions work.

The text in the red box below is actually being fetched an example API endpoint, handled by `src/http/get-api/index.js`.

![React API](/_static/screens/guides/create-react-app/react-api.jpg)

The output of this HTTP function can be called by fetching `GET /api`, and subsequently used by any component within your React app:

```js
// src/http/get-api/index.js

exports.handler = async function http (req) {
  console.log('Begin API called')
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      message: 'Hello from your Begin API!'
    })
  }
}
```

Now let's navigate to `src/App.js` to see how this HTTP function was being implemented into your app. As you can see below, `GET /api/` is fetched via async function wrapped in a React hook (`useEffect`).

```js
// src/App.js

const App = () => {
  const [message, setMessage] = useState('...loading')

  useEffect(() => {
    async function fetchData () {
      try {
        let data = await (await fetch('/api')).json()
        setMessage(data.message)
      } catch (err) {
        setMessage(err.message)
      }
    }
    fetchData()
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <p>Change me!</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```

This is just one small example of how using a live API endpoint powered by an HTTP function can make your React app dynamic. Just think of all the things you can build this way!

---

## Deploy your site

While not required, it's always a good idea to lint and run tests before pushing just to make sure you catch any errors:

```bash
npm run lint
npm t
```

Everything set? Now let's push this commit (and deploy the build to `staging`):

```bash
git add -A
git commit -am 'Just customizing my Begin site!'
git push origin master
```

Head on back to Begin and open your `staging` URL once your build is complete. Looking good? Excellent.

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app.

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You've now got a shiny new React app hosted on Begin – nice work.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20React%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about React:
  - [React home](https://reactjs.org/)
  - [React docs](https://reactjs.org/docs/getting-started.html)
  - [CRA Getting Started](https://create-react-app.dev/docs/getting-started/)
