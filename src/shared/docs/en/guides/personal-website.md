> ⏱ This tutorial is an introductory walkthrough of creating a personal website on Begin. It should take fewer than 5 minutes.

## Introduction

**Hello there, Beginner!**

This tutorial walks through setting up a fast, beautiful, custom personal site running on Begin. It uses example code that demonstrates server-side rendering, shared components, and static assets.


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

Get stoked, here's a little preview of your new site:

![Personal website](/_static/screens/guides/personal-website/begin-personal-site.jpg)

---

## Getting started

### Create your new personal website

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-personal-website)


### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: your Begin app name and repository name cannot be changed later.

![Name your Begin app and repo](/_static/screens/guides/personal-website/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin will spin up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Your first deploy

After creating your app, you'll be taken to its `Activity` stream. Welcome to the main backend interface of your Begin app!

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)

From the `Activity` view, you'll be able to watch your app build & deploy in real-time. Any time you push to `master`, you'll see a new build get kicked off in Begin.

Each build undergoes a number of predefined build steps (learn more about [build steps here](https://docs.begin.com/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your personal site:

![Personal website](/_static/screens/guides/personal-website/begin-personal-site.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/shared/begin-activity-2.jpg)

Look for this code, and try editing your basic bio (like your name or location):
```js
// Customize your site by changing the data below
exports.handler = async function Index () {
  let body = Main({
    /**
     * Basic bio
     */
    fullname: 'Your Name', // ←  Start by adding your name!
    title: 'My personal site!',
    occupation: 'Artist & Photographer',
    location: 'West Glacier, MT',
    bio: 'Lorem ipsum dolor sit amet...',
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

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders in the source tree of your personal website:

```bash
.
├── public/
└── src/
    ├── http/
    │   └── get-index/
    └── views/
```

Let's go over each of these directories and how you may use them:

### `public/`

The `public` directory where you'll add images (like the background image for your site) and any other static assets or files you want to make publicly accessible in your app.

Each time your app deploys, the contents of this folder will automatically be published to your app's static asset bucket (on [S3](https://aws.amazon.com/s3/)) as well as Begin's CDN.

> **Exercise caution!** The full contents of this folder will be copied with each deploy, overwriting any existing files with the same name.


### `src/http/get-index/`

The cloud function that handles requests to your site is found at `src/http/get-index/`.

Some Begin apps are inert static web sites – but not this one. Your personal website is built on a small, fast, individually executing cloud function that handles your HTTP requests and responses. (We call those HTTP functions, for short.)

The HTTP function that handles requests to the root of your app (`GET /`) is found in `src/http/get-index/`.


### `src/views/`

By default, the contents of `src/views/` gets copied into each of your project's `GET` HTTP functions (at `node_modules/@architect/views` for Node, or `vendor/views` for Ruby and Python) whenever you start the local dev server (or deploy your app).

This means the modules in this folder can be used by any `GET` HTTP function in your app.

For example, here's how you'd `require` `src/views/main.js`:

```javascript
let layout = require('@architect/views/main')
```

> 💡 **Learn more!** Head here to dig deeper into [the project structure of Begin apps](/en/getting-started/project-structure/).

---

## Customize your site

Now for the fun part! Let's customize your personal website and really make it your own.

You've already changed default name. Now let's add your social media links and change the background image.

![Personal website](/_static/screens/guides/personal-website/begin-personal-site.jpg)

As you saw earlier, `/src/http/get-index/index.js` is a great place to get started updating the content of your site. Open that file in your editor:

Now let's input your social media handles in place of the dummy data. Go ahead and change the values of the `email`, `twitter`, `linkedin`, `instagram`, and `facebook` keys – or remove any you don't want to keep.

```javascript
// src/http/get-index/index.js

const Main = require('@architect/views/main.js')
const staticAssetsHelper = require('./static-assets-helper')

// Customize your site by changing the data below
exports.handler = async function Index () {
  let body = Main({
    /**
     * Basic bio
     */
    fullname: 'Your Name', // ←  Start by adding your name!
    title: 'My personal site!',
    occupation: 'Artist & Photographer',
    location: 'West Glacier, MT',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',

    /**
     * Contact / social
     * - Comment out any item below to remove it from your page
     */
    email: 'your@email.com',
    twitter: 'yourTwitter',
    linkedin: 'your-linkedin-name',
    instagram: 'yourInsta',
    facebook: 'your-facebook-name',

    /**
     * Layout
     */
    photographer: 'Ivana Cajina',
    service: 'Unsplash',
    credit: 'https://unsplash.com/@von_co',
    image: staticAssetsHelper('background.jpg')
    // or link to an external image URL such as ↓
    // image: 'https://images.unsplash.com/photo-1506535772317-9fdb71c959c6'
  })

  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body
  }
}
```
[View source](https://github.com/begin-examples/node-personal-website/blob/master/src/http/get-index/index.js)


Now we'll update your background image. Grab a new one [Unsplash](https://unsplash.com) (or wherever you please) and place it in the `public/`. Let's name this new image `background-2.jpg`.

Go back to `/src/http/get-index/index.js` and replace the current reference to `background.jpg` with `background-2.jpg`.

> You may notice that your background image is being returned by a module named `staticAssetHelper`. This helper demonstrates how to load static assets with the correct URLs locally, in staging, and via the Begin CDN in production.

Ok, let's see the finished product. With your local dev server running (`npm start`), preview your site.

![Updated personal website](/_static/screens/guides/personal-website/begin-personal-site-2.jpg)

That's one beautiful personal website you've got there – customized to your liking! Time to deploy and show the world what you've just created.

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

You've now got a shiny new personal website hosted on Begin – nice work.

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
