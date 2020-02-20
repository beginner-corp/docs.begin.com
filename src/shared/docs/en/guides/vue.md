<<<<<<< HEAD
<<<<<<< HEAD
> ⏱ This tutorial is an introductory walkthrough of creating a Vue app on Begin. It should take fewer than 15 minutes.
=======
> ⏱ This tutorial is an introductory walkthrough of creating a React app on Begin. It should take fewer than 15 minutes.
>>>>>>> Vue init
=======
> ⏱ This tutorial is an introductory walkthrough of creating a Vue app on Begin. It should take fewer than 15 minutes.
>>>>>>> added more sections up to project strructure

## Introduction

**Hello there, Beginner!**

This tutorial uses the [Vue](https://vuejs.org/) starter app, extended by an example API endpoint. You'll have all the capabilities of Vue for building beautiful user interfaces, combined with the power, speed, and security of cloud functions and serverless data storage.

<<<<<<< HEAD
### What is Vue.js?

Vue (pronounced like view) is a progressive framework for building user interfaces. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

If you’d like to learn more about Vue before diving in, here is a [video](https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/) walking through the core principles of Vue and a sample project.
=======
>>>>>>> Vue init

### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

Although it would be helpful to have some experience with Vue, it's not required to follow along with this tutorial. (Related, the [Vue docs](https://vuejs.org/v2/guide/) are a great reference.)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make your first React app in Begin!

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> added more sections up to project strructure
---

## Getting started

### Create your new Vue app

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-vue)

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

Each build undergoes a number of predefined build steps (learn more about [build steps here](http://localhost:4445/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your Vue app:

![Vue intro](/_static/screens/guides/vue/vue-intro.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/shared/begin-activity-2.jpg)

Look for this code, and try editing your basic app. Let's edit the `<h2>` tag that says "Change me!" to "My app!":

```js
// Customize your site by changing the data below
return (
  <template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <h2>Change me</h2> // Start by editing here!
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
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

<<<<<<< HEAD
## Vue CLI

[Vue CLI](https://cli.vuejs.org/) is a command line interface that acts as standard tooling for Vue.js development. It's feature rich with out-of-the-box support for Babel, Typescript, ESLint, Unit Testing & End-to-end Testing. You create, develop and manage your projects through an accompanying graphical user interface. It's really cool and you might want to set it up in your project for future use. We'll show you how to do that.

### Getting Started
Since we've already created our project and have it set up locally on our machine, all we have to do is install the CLI globally and run the command to start the GUI(graphical user interface)

**Install globally:**
```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

**Start GUI:**
```bash
vue ui

```
Once you start the GUI, you will see this screen load up in your browser on `http://localhost:8000`
Our project is already on our local machine so let's click the import button to sync our project and the GUI.

![vue-cli](/_static/screens/guides/vue/vue-cli-1.jpg)

Look for your begin-vue-app project folder and click `import this folder` as shown in the screen below.

![vue-cli](/_static/screens/guides/vue/vue-cli-2.jpg)

Now we're synced. Welcome to your new project! Vue CLI and the accompanying GUI tool give you tremendous insight and analytics into your Vue app. 

![vue-cli](/_static/screens/guides/vue/vue-cli-3.jpg)

> 💡 **Learn more!** Be sure to head over to the [Vue CLI docs](https://cli.vuejs.org/guide/) to learn everything there is to know about these Vue development tools.

---

=======
>>>>>>> added more sections up to project strructure
## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your Vue app:

```bash
.
<<<<<<< HEAD
├── public/ 
=======
├── public/
>>>>>>> added more sections up to project strructure
├── src/ 
│    ├── assets/
│    ├── components/
│    ├── http/
│    │   └── get-api/
│    ├── App.vue
│    └── main.js
└── test/
```

<<<<<<< HEAD
Let's go over each of these directories & files and learn how you may use them:

### `public/index.html` & `main.js`

`public/index.html` is the page served in the browser. Vue is a single page application framework. It's used to create single page applications(SPA). It loads just one file which is the `index.html` file. The div with an id of app (as seen in the code below) is a placeholder for our Vue application.

```html
// public/index.html

  <div id="app"></div>
```

It's being output into our `main.js` file found inside of the `src` folder which is the entry point into Vue. Here we import Vue and our main app component which is a file called `./App.vue`.

We create a new Vue instance and we render the app component inside of an element with the id of `app`.

## ./App.vue
=======
---
>>>>>>> Vue init
=======
Let's go over each of these directories and files and how you may use them:
>>>>>>> added more sections up to project strructure
