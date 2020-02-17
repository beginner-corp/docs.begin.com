> ⏱ This tutorial is an introductory walkthrough of creating a Svelte app on Begin. It should take fewer than 5 minutes.

## Introduction

**Hello there, Beginner!**

This tutorial walks through setting up a Svelte app running on Begin. [Svelte](https://svelte.dev/) is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app. Today you will learn how to create a Svelte app powered by Begin HTTP functions.

### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make a new personal website with Begin!

**Let's get started!**

---

## Getting started

### Create your Svelte app

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-svelte)


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

Each build undergoes a number of predefined build steps (learn more about [build steps here](https://docs.begin.com/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your basic Svelte app:

![Svelte](/_static/screens/guides/svelte/svelte-screen.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/shared/begin-activity-2.jpg)

Look for this code, and try changing the color of the `h1` tag and the text of the `h2`:

```js
// Customize your site by changing the color of the h1
<script>
  import { onMount } from 'svelte'
  export let message;
  onMount(async () => {
    let data = await (await fetch('/api')).json()
    message = data.msg
    console.log('MESSAGE: ', message)
  })
</script>

<style>
  h1 {
    color: purple; // <-- Change color!
  }
</style>

<h1>{message}</h1>
<h2>Change me!</h2> // <--Change text!

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
npm run dev
```

You should see a `localhost` link in your terminal – go ahead and visit that in your browser.

That's all you need to do preview your changes locally before pushing them to `staging`!

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders in the source tree of your Svelte app:

```bash
.
├── public/
├── src/
│   ├── http/
│   │   └── get-api/
│   │       └── index.js
│   ├── App.svelte
│   └── main.mjs
└── rollup.config.js  
```
Let's go over each of these directories and how you may use them:

### `rollup.config.js`

[Rollup](https://rollupjs.org/guide/en/) is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It allows us to use the `import` syntax so that we may create component based applications. This config file bundles all of your component level CSS and JS into the `public` directory.

> 💡 **Learn more!** Head here to dig deeper into [Rollup.js](https://rollupjs.org/guide/en/)

### `public/`

The `public` directory is where you'll add images and any other static assets or files you want to make publicly accessible in your app.

Each time your app deploys, the contents of this folder will automatically be published to your app's static asset bucket (on [S3](https://aws.amazon.com/s3/)) as well as Begin's CDN.

This is also where your component level CSS & JS are bundled. Your apps global CSS which affects the entirety of your apps styling can be found in this directory as well.

> **Exercise caution!** The full contents of this folder will be copied with each deploy, overwriting any existing files with the same name.

### `src/http/get-api/`

The cloud function that handles requests to your site is found at `src/http/get-api/`.

Some Begin apps are inert static web sites – but not this one. Your Svelte app is built on a small, fast, individually executing cloud function that handles your HTTP requests and responses. (We call those HTTP functions, for short.)

```js
exports.handler = async function http (req) {
  console.log('Begin API called')
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      msg: 'Hello from Svelte + your Begin API!'
    })
  }
}

```

### `src/main.mjs`

`/main.js` imports in your `./App.svelte` file which is your root app component. In this example we initialize your app to `document.body` and pass it a prop just to show you that props can be passed along to different components inside of your app.

```js
import App from './App.svelte'
let message = '...loading'

const app = new App({
  target: document.body,
  props: {
    message
  }
})

export default app

```

### `src/App.svelte`

This is the root of your app that displays your frontend. The script tag in this example is taking in props from `/main.js`. Right below the script tag we have the style tag for styling this particular components CSS. Lastly at the bottom we have a section for our HTML which can take in JS variables.

```js
// Javascript
<script>
  import { onMount } from "svelte";
  export let message;
  onMount(async () => {
    let data = await (await fetch("/api")).json();
    message = data.msg;
    console.log("MESSAGE: ", message);
  });
</script>

// CSS
<style>
  h1 {
    color: red;
  }
</style>

// HTML
<h1>{message}</h1>
<h2>Change me!</h2>
```

> 💡 **Learn more!** Head here to dig deeper into [the project structure of Begin apps](/en/getting-started/project-structure/).

---

## Using API endpoints

Extending your Svelte app with HTTP functions is why you're here right? Right. So let's go over how this is made possible. 

Take a look at the code in between the script tag below. We're fetching data from `src/http/get-api/` and then loading that data in the variable named `message`. We're now able to pass this variable into our HTML as props so that it displays the data from our HTTP function. Pretty cool!

```js
// JS goes here
<script>
  import { onMount } from "svelte";
  export let message;
  onMount(async () => {
    let data = await (await fetch("/api")).json();
    message = data.msg;
    console.log("MESSAGE: ", message);
  });
</script>

// CSS styling goes here
<style>
  h1 {
    color: red;
  }
</style>

// HTML elements and components go here
<h1>{message}</h1>
<h2>Change me!</h2>
```


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

Head on back to Begin and open your `staging` URL once your build is complete. Looking good? Excellent!

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app!

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You've now got a shiny new Svelte app hosted on Begin – nice work.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20new%20site%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- [Begin reference docs](http://localhost:4445/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
