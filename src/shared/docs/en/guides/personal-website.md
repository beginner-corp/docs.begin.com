> ⏱ This tutorial is an introductory walkthrough of creating a personal website on Begin. It should take fewer than 5 minutes.

## Introduction

**Hello there, Beginner!**

This tutorial walks through setting up a fast, beautiful, custom personal site running on Begin. It uses example code that demonstrates server-side rendering, shared components, and static assets.


### Prerequisites

You will need a GitHub account to follow along with this tutorial. (Head here to [learn more about signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development principles using JavaScript and Node.js

You do not need to be an expert in any of these things in order to follow along.

**Let's get started!**

Get stoked, here's a little preview of your new site:

![Begin Personal Example](/_static/screens/begin-personal-site.jpg)

---

## Getting started

### Create your new personal website

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-personal-website)


### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: the your Begin app name and repository name cannot be changed later.

![Begin Personal Example](/_static/screens/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin will spin up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Your first deploy

After creating your app, you'll be taken to its `Activity` stream. Welcome to the main backend interface of your Begin app!

![Begin activity](/_static/screens/begin-activity.jpg)

From the `Activity` view, you'll be able to watch your app build & deploy in real-time. Any time you commit to `master`, you'll see a new build get kicked off in Begin.

Each build undergoes a number of predefined build steps (learn more about [build steps here](http://localhost:4445/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your personal site:

![Begin Personal Example](/_static/screens/begin-personal-site.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/begin-activity-2.jpg)

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
git clone https://github.com/yourname/your-new-project.git
```

Once you've got your project cloned on your local machine, `cd` into the project directory, install your dependencies, and start the local dev server:
```bash
cd your-new-project
npm install
npm start
```

You should see a `localhost` link in your terminal – go ahead and visit that in your browser.

That's all you need to do preview your changes locally before pushing them to `staging`!

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around.

**A quick look at the source tree of a basic Begin app:**

```bash
.
├── public/
└── src/
    ├── http/
    │   └── get-index/
    └── views/
```

You will mainly be working inside of these directories shown above.

Let's go over each of these directories and how you may use them:

### `public/`

#### Host static assets with `public/`

The `public` directory is a great place to add images (like the background image for your site), JS and CSS, or any other files you want to make publicly accessible in your app.

Each time your app deploys, the contents of this folder will automatically be published to S3 and Begin's CDN.

> **Use caution!**
> The full contents of this folder will be copied with each deploy,  overwriting any existing files with the same name.

### `src/http`

Begin applications are comprised of many small, fast, individually executing cloud functions (or Functions, for short).

Your app's many small, fast, isolated Functions are organized in your project under `src/http`.

Each HTTP Function directory services a handler for a publicly available HTTP route (e.g. `src/http/get-hello-world` services `GET /hello/world`).


### `src/views`

#### Share frontend code with `src/views`

By default, the contents of `src/views` gets copied into each of your project's `@http` `GET` functions (at `node_modules/@architect/views` for Node, or `vendor/views` for Ruby and Python) whenever you run `npx sandbox`.

This means the modules in this folder can be used by any `@http` `GET` function in your app.

For example, here's how you'd require `src/views/layout.js`:

```javascript
let layout = require('@architect/views/layout')
```

> 💡 **Learn more!** Head here to dig deeper into [the project structure of Begin apps](/en/getting-started/project-structure/).

---

## Customize your site

Now for the fun part! Let's show you how to customize your personal website and make it your own.

You've already changed the name on your personal site. Now let's add your social media links and change the background image.

![Begin Personal Example](/_static/screens/begin-personal-site.jpg)

Head to the `/src/http/get-index/index.js` directory inside of your project folder.

This is where we'll be able to change all of the content on this page.

```javascript
///src/http/get-index/index.js


// Customize your site by changing the data below
exports.handler = async function Index () {
  let body = Main({
    /**
     * Basic bio
     */
    fullname: 'Personal website', // ←  Start by adding your name!
    title: 'My personal site!',
    occupation: 'Artist & Programmer',
    location: 'West Glacier, MT',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',

    /**
```
[View Source](https://github.com/begin-examples/node-personal-website/blob/master/src/http/get-index/index.js)

Now let's update the social media links and change the background image. Input your social media handles in place of the dummy data. 

You may notice that the `background.jpg` image is being imported from another module named `staticAssetHelper`. This helper demonstrates how to use your Begin CDN as well as local development and staging previews of static assets.

Grab a new image from [Unsplash](https://unsplash.com/@von_co) and place it inside of the `public/` folder with the original image. Let's name this new image `background-2.jpg`.

Go back to `/src/http/get-index/index.js` and replace the current image with your new one that you placed inside of your `public/` directory.

```javascript
//src/http/get-index/index.js

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
    image: staticAssetsHelper('background.jpg') // <-- Replace image
    // or link to an external image URL such as ↓
    // image: 'https://images.unsplash.com/photo-1506535772317-9fdb71c959c6'
```
[View Source](https://github.com/begin-examples/node-personal-website/blob/master/src/http/get-index/index.js)


Now let's take a look at the finished product. One beautiful personal website that's customized to your liking! Time to deploy and show the world what we've just created.

![Begin Personal Example](/_static/screens/begin-personal-site-2.jpg)

---

<!-- ## Begin Data

--- -->

## Deploying your site

Run Begin's build steps locally:
```javascript
  npm run lint // Lint your code
  npm t  // Run your tests
```
Deploy to `staging`
```javascript
  Just commit and `git push` to `master`!
```

Deploy to `production`:
  - Use the `Deploy to production` button in Begin, or
  - Bump your [npm version](https://docs.npmjs.com/cli/version): `npm version [patch|minor|major] && git push origin`
  - Cut your own git tag: `git tag -a 1.0.0 -m "1.0, here we come" && git push origin 1.0.0`


## Additional resources

- [Begin reference docs](https://docs.begin.com)
- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- Get help:
- [Begin community](https://spectrum.chat/begin)
- [Issue tracker](https://github.com/smallwins/begin-issues/issues)

---

> _We all can't wait to see what you build with [Begin](https://begin.com)!_
