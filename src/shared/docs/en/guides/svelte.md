> ⏱ This guide should take less than 5 minutes.

## Introduction

**Hello there, Beginner!**

This guide will help you get acquainted with Begin's [Svelte example app](https://github.com/begin-examples/node-svelte) which uses [Svelte](https://svelte.dev/) as the front-end framework for an app that talk's to a cloud function based API.

> ✋🏽 You will need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node.js](https://nodejs.org/en/download/) and a [GitHub account](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github) to follow along.

---

## Create your Svelte app

Click the **Deploy to Begin** button below.


[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-svelte)
<br/>
<br/>

Name your app and click the `Create...` button to have Begin a new app and GitHub repo.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)
<br/>
<br/>
<br/>

**Check out your apps' activity feed!**

Now click the **Staging** link in the upper left corner to see your app running in your staging environment.

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)
<br/>
<br/>
<br/>

You should see something like the image below:
![Svelte](/_static/screens/guides/svelte/svelte-screen.jpg)
<br/>
<br/>
<br/>

**Way to go!**

Now follow the prompts on the intro cards to get acquainted with Begin.
> 💡 Learn more about [CI/CD environments](https://docs.begin.com/en/getting-started/builds-deploys)

---

## Project structure

If you followed the intro cards in the activity view you are ready to review your project's structure on your local machine.
<br/>

```bash
.
├── api/
│   └── index.js
├── public/
├── src/
│   ├── App.svelte
│   └── main.mjs
└── rollup.config.js
```

Let's go over each of these directories and how you may use them:

### `api/`

This directory contains a handler function for the API.


> 💡 **Learn more!** Head here to dig deeper into [HTTP functions in Begin apps](/en/http-functions/provisioning/).


### `public/`

The `public` directory is where you'll add images and any other static assets or files you want to make publicly accessible in your app.

Each time your app deploys, the contents of this folder will automatically be published to your app's static asset bucket on [S3](https://aws.amazon.com/s3/) and Begin's CDN.

This is also where your component-level CSS & JS are bundled, as well as your app's global CSS, which affects the entirety of your app's styling.

> ⚠️ **Exercise caution!** The full contents of this folder will be copied with each deploy, overwriting any existing files with the same name.


### `src/main.js`

The main entry point for your Svelte app, `src/main.js` imports your `App.svelte` file (your root app component). In this example, we initialize your app to `document.body` and pass it a prop to demonstrate how props can be passed along to different components inside of your app.


### `src/App.svelte`

`src/App.svelte` is what's referred to as a single file component – it contains all of the code needed to display your frontend. The opening `<script>` tag contains JavaScript, and in this example it receives in props from `src/main.js`:

```js
<script>
  import { onMount } from 'svelte'
  export let name;
  export let message;
  onMount(async () => {
    let data = await (await fetch('/api')).json()
    message = data.msg
    console.log('MESSAGE: ', message)
  })
</script>
```

Right below the `<script>` tag we have a section for our HTML – `<main>` – which can render variables from your script tag inside `{curly brackets}`:

```js
<main>
  <h1>Hello {name}!</h1>
  <h2>{message}</h2>
  <h3>Change me!</h3>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
```

Lastly, at the bottom of `src/App.svelte` we have a `<style>` tag, which contains all the CSS for this specific component.


### `rollup.config.js`

[Rollup](https://rollupjs.org/guide/en/) is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It allows us to use ES modules `import` syntax so that we may create component-based applications. This config file bundles all of your component-level CSS and JS into the `public` directory.

---

## Using API endpoints

Extending your Svelte app with HTTP functions may be why you're here, right? Let's take a look at how all this works.

Let's start with the `src/App.svelte` code inside `<script>` tag found below. When the component renders initially into a page or "mounts", we're able to use what's called a lifecycle method called `onMount`, which is provided by the Svelte framework. Inside this `onMount` handler we fetch data from `src/http/get-api/` and then set the variable named `message` with the returned data. We're now able to pass this variable into our HTML as props so that it displays a message from our HTTP function. Not bad, right?

```js
// src/App.svelte

// JavaScript
<script>
  import { onMount } from 'svelte'
  export let name;
  export let message;
  onMount(async () => {
    let data = await (await fetch('/api')).json()
    message = data.msg
    console.log('MESSAGE: ', message)
  })
</script>

// HTML
<main>
  <h1>Hello {name}!</h1>
  <h2>{message}</h2>
  <h3>Change me!</h3>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
```

This is just one small example of how using a live API endpoint powered by an HTTP function can make your Svelte app dynamic. Just think of all the things you can build this way!

---

## Deploy your site

Add and commit your files then push to master to kick off a build that will deploy to `staging`.

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

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Svelte%20site%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://github.com/smallwins/begin-community/discussions)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about Svelte
  - [Svelte docs](https://svelte.dev/)
  - [Svelte Quickstart](https://svelte.dev/blog/the-easiest-way-to-get-started)
  - [Rich Harris - Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao&feature=emb_title)
